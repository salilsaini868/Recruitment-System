using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace RS.Common.CommonData
{
    public static class FileHelper
    {
        public static void SaveFile(IFormFile file,string documentName,string[] allowedExtensions, IHostingEnvironment hostingEnvironment)
        {
            string path = Path.Combine(hostingEnvironment.ContentRootPath, "uploadFiles");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var extension = Path.GetExtension(file.FileName);
            var results = Array.Find(allowedExtensions, s => s.Equals(extension));
            if (!string.IsNullOrEmpty(results))
            {
                var filePath = Path.Combine(path, documentName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
            }
        }

        public static string GetExtension(IFormFile file, string[] allowedExtensions)
        {
            string result = null;
            if (file.Length > 0)
            {
                var extension = Path.GetExtension(file.FileName);
                var results = Array.Find(allowedExtensions, s => s.Equals(extension));
                if (!string.IsNullOrEmpty(results))
                {
                    result = extension;
                }
            }
            return result;
        }
    }
}

