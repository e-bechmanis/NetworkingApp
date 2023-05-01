using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            // The below should give server enough info to take a look at the token and validate it
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => 
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        //Server is going to cross-check the token against issuer sign-in key
                        // Otherwise, any jwt token would be accepted
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.
                            UTF8.GetBytes(config["TokenKey"])),
                        ValidateIssuer = false, // because issue is this API server
                        ValidateAudience = false
                    };
                });

            return services;
        }
    }
}