using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RS.Data;
using RS.Data.Interfaces;
using Swashbuckle.AspNetCore.Swagger;

namespace RS.Web
{
    public class Startup
    {
        private const string DefaultCorsPolicyName = "localhost";
        public Startup(IHostingEnvironment env)
        {
            //Configuration = configuration;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            RuntimeEnvironment = Configuration.GetSection("Environment")["ASPNETCore_Global"];
            DefaultThreshold = Configuration.GetSection("DefaultThreshold")["DefaultThreshold"];
        }

        public IConfiguration Configuration { get; }
        public IConfigurationRoot ConfigurationRoot { get; }
        public static string RuntimeEnvironment { get; set; }
        public static string DefaultThreshold { get; set; }
        public static bool UseMocks { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddDbContext<RSContext>(option => option.UseSqlServer(Configuration.GetConnectionString("RSConnection")));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Add all Transient dependencies
            services = BuildUnityContainer.RegisterAddTransient(services);

            //Configure CORS for angular2 UI
            services.AddCors(options =>
            {
                options.AddPolicy(DefaultCorsPolicyName, p =>
                {
                    //todo: Get from confiuration
                    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                });
            });

            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info {
                    Version = "v1",
                    Title = "RS System",
                    Description = "A sample API architecture for RS system.",
                    TermsOfService = "None",
                    License = new License { Name = "Evry India", Url = "http://evry.com/" }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(DefaultCorsPolicyName); //Enable CORS!
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "RS API V1");
            });
            app.UseMvc();
            app.UseDefaultFiles();
			app.UseStaticFiles();
        }
    }
}
