using System;
using System.Collections.Generic;
using System.Text;

namespace RS.ViewModel.SearchAndSortModel
{
    public class SearchAndSortModel
    {
        public string Property { get; set; }
        public int Direction { get; set; }
        public Guid UserId { get; set; }
        public string SearchString { get; set; }
    }
}
