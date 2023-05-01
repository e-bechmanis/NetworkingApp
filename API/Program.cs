using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// This includes the rest of the own extended services // ./Extensions/AppServiceExtensions.cs
builder.Services.AddAppServices(builder.Configuration);
// This includes the rest of the own identity services // ./Extensions/IdentityServiceExtensions.cs
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configuring CORS policy builder 
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

//adding middleware for jwt auth to work
app.UseAuthentication(); // Does user have a valid token?
app.UseAuthorization(); // Token is OK, is user authorized to proceed?

app.MapControllers();

app.Run();
