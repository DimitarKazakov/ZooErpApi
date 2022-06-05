using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using ZooErp.Data;
using ZooErp.Services;

var builder = WebApplication.CreateBuilder(args);
var localhostCors = "AllowLocalhostOrigin";
ConfigurationManager configuration = builder.Configuration;
IWebHostEnvironment environment = builder.Environment;

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: localhostCors,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
    {
        o.Authority = configuration["Keycloak:Authority"];
        o.Audience = configuration["Keycloak:Audience"];
        o.Events = new JwtBearerEvents()
        {
            OnAuthenticationFailed = c =>
            {
                c.NoResult();

                c.Response.StatusCode = 500;
                c.Response.ContentType = "text/plain";

                if (environment.IsDevelopment())
                {
                    return c.Response.WriteAsync(c.Exception.ToString());
                }

                return c.Response.WriteAsync("An error occured processing your authentication.");
            }
        };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Administrator", policy => policy.RequireClaim("user_roles", "Administrator"));
    options.AddPolicy("Manager", policy => policy.RequireClaim("user_roles", "Manager", "Administrator"));
    options.AddPolicy("Reporter", policy => policy.RequireClaim("user_roles", "Manager", "Administrator", "Reporter"));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

const string scheme = "Bearer";
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

    c.AddSecurityDefinition(scheme, new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = scheme,
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = scheme,
                            },
                            Scheme = "oath2",
                            Name = scheme,
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    },
                });
});

builder.Services.AddDbContext<ApplicationDbContext>();
builder.Services.AddTransient<AuthenticationService>();
builder.Services.AddTransient<EventService>();
builder.Services.AddTransient<CageService>();
builder.Services.AddTransient<FoodService>();
builder.Services.AddTransient<AnimalService>();

builder.Services.AddTransient<SeedService>();
builder.Services.AddTransient<ColorService>();
builder.Services.AddTransient<CarLevelService>();
builder.Services.AddTransient<CarMakeService>();
builder.Services.AddTransient<ConditionsService>();
builder.Services.AddTransient<FuelTypesService>();
builder.Services.AddTransient<ExtrasService>();
builder.Services.AddTransient<TuningService>();
builder.Services.AddTransient<CarService>();

builder.Services.AddSingleton<IConfiguration>(configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(localhostCors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
