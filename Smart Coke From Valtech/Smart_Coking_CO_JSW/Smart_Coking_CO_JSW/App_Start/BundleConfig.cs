using System.Web;
using System.Web.Optimization;

namespace Smart_Coking_CO_JSW
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
               "~/Content/Style.css"));


            bundles.Add(new ScriptBundle("~/Scripts/js").Include(
                        "~/Scripts/JavaScript1.js"));

        }
    }
}
