using API.data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
// AddTransient is too short-lived for HTTP request
// AddSingleton <-- token will reside in-memory for the entire length of app lifetime. Caching service would be a use-case
// Recommended to add interfaces, because it's easier to test against interfaces
builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

// Configuring CORS policy builder 
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
app.MapControllers();

app.Run();
