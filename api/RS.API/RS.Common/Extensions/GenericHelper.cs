using RS.Common.CommonData;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace RS.Common.Extensions
{
    public static class GenericHelper
    {

        public static UserClaim GetUserClaimDetails(ClaimsIdentity identity)
        {
            UserClaim userClaim = null;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                userClaim = new UserClaim
                {
                    Name = identity.FindFirst(ClaimTypes.Name).Value,
                    Email = identity.FindFirst(ClaimTypes.Email).Value,
                    Role = identity.FindFirst(ClaimTypes.Role).Value,
                    UserId = new Guid(identity.FindFirst(ClaimTypes.Sid).Value)
                };
            }
            return userClaim;
        }

        /// <summary>
        /// Maps the audit columns.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="identity"></param>
        public static void MapAuditColumns(this object model, ClaimsIdentity identity)
        {
            if (identity != null)
            {
                var authorizedInfo = GenericHelper.GetUserClaimDetails(identity);
                if (model != null && authorizedInfo != null)
                {
                    if (Convert.ToDateTime(GetColumnValue(Constants.CreatedDate, model)) == default(DateTime))
                    {
                        SetColumnValue(Constants.IsActiveColumn, model, true);
                        SetColumnValue(Constants.CreatedDate, model, DateTime.Now);
                        SetColumnValue(Constants.CreatedBy, model, authorizedInfo.UserId);
                    }
                    SetColumnValue(Constants.ModifiedDate, model, DateTime.Now);
                    SetColumnValue(Constants.ModifiedBy, model, authorizedInfo.UserId);
                }
            }
        }

        public static void MapDeleteColumns(this object model, ClaimsIdentity identity)
        {
            if (identity != null)
            {
                var authorizedInfo = GenericHelper.GetUserClaimDetails(identity);
                if (model != null && authorizedInfo != null)
                {
                    SetColumnValue(Constants.IsActiveColumn, model, false);
                    SetColumnValue(Constants.IsDeletedColumn, model, true);
                    SetColumnValue(Constants.DeletedDate, model, DateTime.Now);
                    SetColumnValue(Constants.DeletedBy, model, authorizedInfo.UserId);
                }
            }
        }

        /// <summary>
        /// Gets the column value.
        /// </summary>
        /// <param name="columnName">Name of the column.</param>
        /// <param name="entity">The entity.</param>
        /// <returns></returns>
        public static object GetColumnValue(String columnName, object entity)
        {
            var pinfo = entity.GetType().GetProperty(columnName);
            if (pinfo == null) { return null; }
            return pinfo.GetValue(entity, null);
        }

        /// <summary>
        /// Sets the column value.
        /// </summary>
        /// <param name="columnName">Name of the column.</param>
        /// <param name="entity">The entity.</param>
        /// <param name="value">The value.</param>
        public static void SetColumnValue(String columnName, object entity, object value)
        {
            var pinfo = entity.GetType().GetProperty(columnName);
            if (pinfo != null) { pinfo.SetValue(entity, value, null); }
        }
    }
}
