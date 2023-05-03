using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        // must be called InvokeAsync, because we are relying on framework to recognize it as middleware
        // HttpContext will give access to the current Http request that is being passed through the middleware
        public async Task InvokeAsync(HttpContext context){
            try
            {
                await _next(context);
            }
            catch (Exception exc)
            {
                // this will ensure that error is always logged into the terminal where the app is running
                // no matter what env we are running it in (DEV, PROD etc)
                _logger.LogError(exc, exc.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                // Limiting the amount of info being returned depending on the run-time env
                var response = _env.IsDevelopment() ? 
                    new ApiException(context.Response.StatusCode, exc.Message, exc.StackTrace?.ToString())
                    : new ApiException(context.Response.StatusCode, exc.Message, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}