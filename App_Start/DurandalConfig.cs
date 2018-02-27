using System;
using System.Web.Optimization;

[assembly: WebActivator.PostApplicationStartMethod(
    typeof(I4X4Trail.App_Start.DurandalConfig), "PreStart")]

namespace I4X4Trail.App_Start
{
    public static class DurandalConfig
    {
        public static void PreStart()
        {
            // Add your start logic here
            DurandalBundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}