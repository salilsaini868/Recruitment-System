using Microsoft.Extensions.DependencyInjection;
using RS.Data.Interfaces;
using RS.Data.Logic;
using RS.Service;
using RS.Service.Interfaces;
using RS.Service.Logic;


namespace RS.Web
{
    public static class BuildUnityContainer
    {
        public static IServiceCollection RegisterAddTransient(IServiceCollection services)
        {
            #region Repository
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            #endregion

            #region Services
            services.AddTransient<IRoleManager, RoleManager>();
            services.AddTransient<IUserService, UserService>();
            #endregion

            return services;
        }
    }
}
