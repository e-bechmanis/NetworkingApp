using API.data;
using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// This includes the rest of the own extended services // ./Extensions/AppServiceExtensions.cs
builder.Services.AddAppServices(builder.Configuration);
// This includes the rest of the own identity services // ./Extensions/IdentityServiceExtensions.cs
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();
// using custom middleware to handle all the exceptions
app.UseMiddleware<ExceptionMiddleware>();

// Configuring CORS policy builder 
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

//adding middleware for jwt auth to work
app.UseAuthentication(); // Does user have a valid token?
app.UseAuthorization(); // Token is OK, is user authorized to proceed?

app.MapControllers();

// The below lines will check if database exists/empty
// It will create it if it doesn't exist, and will seed the data into existing empty database
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception exc)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(exc, "An error occurred during migration");
}

app.Run();
