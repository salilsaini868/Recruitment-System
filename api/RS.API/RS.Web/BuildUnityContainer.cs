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
            services.AddTransient<IApprovalRepository, ApprovalRepository>();
            services.AddTransient<ICandidateRepository, CandidateRepository>();
            services.AddTransient<IOpeningRepository, OpeningRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            #endregion

            #region Services
            services.AddTransient<IApprovalManagerService, ApprovalManagerService>();
            services.AddTransient<ICandidateManagerService, CandidateManagerService>();
            services.AddTransient<IOpeningManagerService, OpeningManagerService>();
            services.AddTransient<IRoleManagerService, RoleManager>();
            services.AddTransient<IUserService, UserManagerService>();
            #endregion

            return services;
        }
    }
}
