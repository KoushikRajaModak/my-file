using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;

namespace Smart_Coking_CO_JSW.Controllers
{
    public class GeneralController : Controller
    {
        // GET: General
        String ConnectionString = ConfigurationManager.ConnectionStrings["DBConnction"].ConnectionString;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        int LastPushOven_N = 0;
        int NextOven = 0;
        int CokegasCV = 0;
        int MixedgasCV = 0;
        int CokegasFlow_PS = 0;
        int CokegasFlow_CS = 0;
        int MIXGASFlow_PS = 0;
        int MIXGASFlow_CS = 0;
        int WGASTEMP1 = 0;
        int WGASTEMP2 = 0;
        int Actual_NPT = 0;
        int AShiftTotalCount = 0;
        int BShiftTotalCount = 0;
        int CShiftTotalCount = 0;
        int RunningNPT = 0;
        int Estimation_NPT=0;
        int Target = 0;
        int TotalCount_T = 0;
        public JsonResult All()
        {
            try
            {



                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                string S_ASHIFT_START_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 06:00.00");
                string S_ASHIFT_END_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 13:59.59");
                string S_BSHIFT_START_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 14:00.00");
                string S_BSHIFT_END_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 21:59.59");
                string S_CSHIFT_START_1 = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 22:00.00");
                string S_CSHIFT_END_1 = DateTime.Now.AddHours(-6).AddDays(1).ToString("yyyy-MM-dd 05:59.59");

                SqlCommand cmd1 = new SqlCommand("select Top(1) OVEN,PUSHEDTIME FROM [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where PUSHEDTIME is not null order by PUSHEDTIME desc", con);
                cmd1.ExecuteNonQuery();
                SqlDataReader SqlReder = cmd1.ExecuteReader();
                if (SqlReder.Read())
                {
                    LastPushOven_N = Convert.ToInt16(SqlReder["OVEN"]);
                }
                SqlReder.Close();

                SqlCommand cmd3 = new SqlCommand("select Top(1) *from [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME is null", con);
                cmd3.ExecuteNonQuery();
                SqlDataReader SqlReder3 = cmd3.ExecuteReader();
                if (SqlReder3.Read())
                {
                    NextOven = Convert.ToInt16(SqlReder3["OVEN"]);

                }
                SqlReder3.Close();

                SqlCommand cmd4 = new SqlCommand("SELECT TOP (1) [TIMEFIELD],[CokegasCV],[MixedgasCV],[CokegasFlow_PS] ,[CokegasFlow_CS],[MIXGASFlow_PS],[MIXGASFlow_CS],[WGASTEMP1],[WGASTEMP2],[Actual_NPT]  FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] order by TIMEFIELD desc", con);
                cmd4.ExecuteNonQuery();
                SqlDataReader SqlReder4 = cmd4.ExecuteReader();
                if (SqlReder4.Read())
                {
                    CokegasCV = Convert.ToInt16(SqlReder4["CokegasCV"]);
                    MixedgasCV = Convert.ToInt16(SqlReder4["MixedgasCV"]);
                    CokegasFlow_PS = Convert.ToInt16(SqlReder4["CokegasFlow_PS"]);
                    CokegasFlow_CS = Convert.ToInt16(SqlReder4["CokegasFlow_CS"]);
                    MIXGASFlow_PS = Convert.ToInt16(SqlReder4["MIXGASFlow_PS"]);
                    MIXGASFlow_CS = Convert.ToInt16(SqlReder4["MIXGASFlow_CS"]);
                    WGASTEMP1 = Convert.ToInt16(SqlReder4["WGASTEMP1"]);
                    WGASTEMP2 = Convert.ToInt16(SqlReder4["WGASTEMP2"]);
                    Actual_NPT = Convert.ToInt16(SqlReder4["Actual_NPT"]);
                }
                SqlReder4.Close();

                SqlCommand cmd5 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + S_ASHIFT_START_1 + "' and '" + S_ASHIFT_END_1 + "' ", con);
                cmd5.ExecuteNonQuery();
                SqlDataReader SqlReder5 = cmd5.ExecuteReader();
                if (SqlReder5.Read())
                {
                    AShiftTotalCount = Convert.ToInt16(SqlReder5["Count"]);
                }
                SqlReder5.Close();
                SqlCommand cmd6 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + S_BSHIFT_START_1 + "' and '" + S_BSHIFT_END_1 + "' ", con);
                cmd6.ExecuteNonQuery();
                SqlDataReader SqlReder6 = cmd6.ExecuteReader();
                if (SqlReder6.Read())
                {
                    BShiftTotalCount = Convert.ToInt16(SqlReder6["Count"]);
                }
                SqlReder6.Close();

                SqlCommand cmd7 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + S_CSHIFT_START_1 + "' and '" + S_CSHIFT_END_1 + "' ", con);
                cmd7.ExecuteNonQuery();
                SqlDataReader SqlReder7 = cmd7.ExecuteReader();
                if (SqlReder7.Read())
                {
                    CShiftTotalCount = Convert.ToInt16(SqlReder7["Count"]);
                }
                SqlReder7.Close();
                SqlCommand cmd8 = new SqlCommand("SELECT TOP (1)[Running_NPT],[Estimation_NPT] FROM [SmartCoking_CO_JSW].[dbo].[Calculette_NPT] order by ID desc", con);
                cmd8.ExecuteNonQuery();
                SqlDataReader SqlReder8 = cmd8.ExecuteReader();
                if (SqlReder8.Read())
                {
                    RunningNPT = Convert.ToInt16(SqlReder8["Running_NPT"]);
                    Estimation_NPT = Convert.ToInt16(SqlReder8["Estimation_NPT"]);
                }

                SqlReder8.Close();
                SqlCommand cmd9 = new SqlCommand("select X8  FROM [SmartCoking_CO_JSW].[dbo].[Temporary]  ", con);
                cmd9.ExecuteNonQuery();
                SqlDataReader SqlReder9 = cmd9.ExecuteReader();
                if (SqlReder9.Read())
                {
                    Target = Convert.ToInt16(SqlReder9["X8"]);
                }
                SqlReder9.Close();
                int TotalCount = AShiftTotalCount + BShiftTotalCount + CShiftTotalCount;
                int DailyTotalCount = TotalCount;
                con.Close();
                return Json(new { LastPushOven_N, NextOven, TotalCount, AShiftTotalCount, BShiftTotalCount, CShiftTotalCount, DailyTotalCount, Target, RunningNPT, Estimation_NPT, CokegasCV, MixedgasCV, CokegasFlow_PS, CokegasFlow_CS, MIXGASFlow_PS, MIXGASFlow_CS, WGASTEMP1, WGASTEMP2, Actual_NPT }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Target_T()
        {

            SqlConnection con = new SqlConnection(ConnectionString);
            con.Open();

            string A_Shift_Start = DateTime.Now.AddHours(-6).ToString("yyyy-MM-dd 06:00");
            string C_Shift_End = DateTime.Now.AddHours(-6).AddDays(1).ToString("yyyy-MM-dd 05:59");
            SqlCommand cmd7 = new SqlCommand("select Count(PUSHEDTIME) As Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] WITH (NOLOCK) where   PUSHEDTIME  between '" + A_Shift_Start + "' and '" + C_Shift_End + "' ", con);
            cmd7.ExecuteNonQuery();
            SqlDataReader SqlReder7 = cmd7.ExecuteReader();
            if (SqlReder7.Read())
            {
                TotalCount_T = Convert.ToInt16(SqlReder7["Count"]);
            }
            SqlReder7.Close();

            int TotalCount = TotalCount_T;

            SqlCommand cmd9 = new SqlCommand("select X8  FROM [SmartCoking_CO_JSW].[dbo].[Temporary]  ", con);
            cmd9.ExecuteNonQuery();
            SqlDataReader SqlReder9 = cmd9.ExecuteReader();
            SqlReder9.Read();
            int TotalTarget = Convert.ToInt16(SqlReder9["X8"]);

            SqlReder9.Close();
            con.Close();
            return Json(new { TotalCount, TotalTarget }, JsonRequestBehavior.AllowGet);
        }

        //public JsonResult MixGasFlow()
        //{
        //    try { 
        //        SqlConnection con = new SqlConnection(ConnectionString);    
        //        con.Open();
        //        int k;int j;
        //        List<string> TIMEFIELD = new List<string>(); 
        //        List<float> MIXGASFlow_PS = new List<float>();
        //        List<float> MIXGASFlow_CS = new List<float>();

        //        SqlCommand cmd = new SqlCommand("SELECT TOP (10) [TIMEFIELD],[MIXGASFlow_PS] ,[MIXGASFlow_CS] FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] Order by TIMEFIELD desc", con);
        //        DataTable dt = new DataTable();
        //        SqlDataAdapter Dta = new SqlDataAdapter(cmd);
        //        Dta.Fill(dt);
        //        k = dt.Rows.Count;
        //        k = k - 1;

        //        for (j = 0; j <= k; j++)
        //        {
        //            DateTime time = DateTime.Parse(dt.Rows[j]["TIMEFIELD"].ToString());
        //            string formattedTime = time.ToString("MM-dd HH:mm");
        //            TIMEFIELD.Add(formattedTime);
        //            MIXGASFlow_PS.Add(float.Parse(dt.Rows[j]["MIXGASFlow_PS"].ToString()));
        //            MIXGASFlow_CS.Add(float.Parse(dt.Rows[j]["MIXGASFlow_CS"].ToString()));

        //        }

        //        con.Close();
        //        return Json(new { TIMEFIELD, MIXGASFlow_PS, MIXGASFlow_CS }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { ex }, JsonRequestBehavior.AllowGet);
        //    }

        //}

        public JsonResult CokeGasFlow()
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                int k; int j;
                List<string> TIMEFIELD = new List<string>();
                List<float> CokegasFlow_PS = new List<float>();
                List<float> CokegasFlow_CS = new List<float>();
                List<float> MIXGASFlow_PS = new List<float>();
                List<float> MIXGASFlow_CS = new List<float>();

                SqlCommand cmd = new SqlCommand("SELECT TOP (10) [TIMEFIELD],[CokegasFlow_PS] ,[CokegasFlow_CS],[MIXGASFlow_PS] ,[MIXGASFlow_CS] FROM [SmartCoking_CO_JSW].[dbo].[CYCDATA] Order by TIMEFIELD desc", con);
                DataTable dt = new DataTable();
                SqlDataAdapter Dta = new SqlDataAdapter(cmd);
                Dta.Fill(dt);
                k = dt.Rows.Count;
                k = k - 1;

                for (j = 0; j <= k; j++)
                {
                    DateTime time = DateTime.Parse(dt.Rows[j]["TIMEFIELD"].ToString());
                    string formattedTime = time.ToString("HH:mm");
                    TIMEFIELD.Add(formattedTime);
                    CokegasFlow_PS.Add(float.Parse(dt.Rows[j]["CokegasFlow_PS"].ToString()));
                    CokegasFlow_CS.Add(float.Parse(dt.Rows[j]["CokegasFlow_CS"].ToString()));
                    MIXGASFlow_PS.Add(float.Parse(dt.Rows[j]["MIXGASFlow_PS"].ToString()));
                    MIXGASFlow_CS.Add(float.Parse(dt.Rows[j]["MIXGASFlow_CS"].ToString()));
                }

                con.Close();
                return Json(new { TIMEFIELD, CokegasFlow_PS, CokegasFlow_CS, MIXGASFlow_PS, MIXGASFlow_CS }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }

        }

        double AShift=0;
        double BShift=0;
        double CShift = 0;
        double Targets = 0;
        double TotalCount = 0; 
        double CC1Count = 0;
        double CC2Count = 0;
        double PC1Count = 0;
        double PC2Count = 0;
    //BerChart TerGet Represent
        public JsonResult DalySecduling()
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
           

                SqlCommand cmd = new SqlCommand("SELECT TOP (1) [ID],[Datestamp],[Types],[Ashift],[Bshift],[Cshift],[Total],[Target],[Performances] FROM [SmartCoking_CO_JSW].[dbo].[DailyReport] where Types='Production' order by ID desc  ", con);
                cmd.ExecuteNonQuery();
                SqlDataReader SqlReder = cmd.ExecuteReader();
                if (SqlReder.Read())
                {
                     AShift = Convert.ToInt16(SqlReder["Ashift"]);
                     BShift = Convert.ToInt16(SqlReder["Bshift"]);
                     CShift = Convert.ToInt16(SqlReder["Cshift"]);
                     Targets = Convert.ToInt16(SqlReder["Target"]);
                     TotalCount = Convert.ToInt16(SqlReder["Total"]);
                }             
                SqlReder.Close();

                SqlCommand cmd1 = new SqlCommand("SELECT TOP (1) [ID],[Datestamp],[Types],[Ashift],[Bshift],[Cshift],[Total],[Target],[Performances] FROM [SmartCoking_CO_JSW].[dbo].[DailyReport] where Types='CC1' order by ID desc  ", con);
                cmd1.ExecuteNonQuery();
                SqlDataReader SqlReder1 = cmd1.ExecuteReader();
                if (SqlReder1.Read())
                {
                    CC1Count = Convert.ToInt16(SqlReder1["Total"]);
                }
                SqlReder1.Close();

                SqlCommand cmd2 = new SqlCommand("SELECT TOP (1) [ID],[Datestamp],[Types],[Ashift],[Bshift],[Cshift],[Total],[Target],[Performances] FROM [SmartCoking_CO_JSW].[dbo].[DailyReport] where Types='CC2' order by ID desc  ", con);
                cmd2.ExecuteNonQuery();
                SqlDataReader SqlReder2 = cmd2.ExecuteReader();
                if (SqlReder2.Read())
                {
                    CC2Count = Convert.ToInt16(SqlReder2["Total"]);
                }
                SqlReder2.Close();

                SqlCommand cmd3 = new SqlCommand("SELECT TOP (1) [ID],[Datestamp],[Types],[Ashift],[Bshift],[Cshift],[Total],[Target],[Performances] FROM [SmartCoking_CO_JSW].[dbo].[DailyReport] where Types='PC1' order by ID desc  ", con);
                cmd3.ExecuteNonQuery();
                SqlDataReader SqlReder3 = cmd3.ExecuteReader();
                if (SqlReder3.Read())
                {
                    PC1Count = Convert.ToInt16(SqlReder3["Total"]);
                }
                SqlReder3.Close();

                SqlCommand cmd4 = new SqlCommand("SELECT TOP (1) [ID],[Datestamp],[Types],[Ashift],[Bshift],[Cshift],[Total],[Target],[Performances] FROM [SmartCoking_CO_JSW].[dbo].[DailyReport] where Types='PC2' order by ID desc  ", con);
                cmd4.ExecuteNonQuery();
                SqlDataReader SqlReder4 = cmd4.ExecuteReader();
                if (SqlReder4.Read())
                {
                    PC2Count = Convert.ToInt16(SqlReder4["Total"]);
                }
                SqlReder4.Close();

                double ChargingCar1  = Math.Round((100 / Targets) * CC1Count, 2);
                double ChargingCar2 = Math.Round((100 / Targets) * CC2Count, 2);
                double PushgingCar1 = Math.Round((100 / Targets) * PC1Count, 2);
                double PushgingCar2 = Math.Round((100 / Targets) * PC2Count, 2);

                return Json(new
                {
                    AShift,
                    BShift,
                    CShift,
                    TotalCount,
                    CC1Count,
                    CC2Count,
                    PC1Count,
                    PC2Count,
                    ChargingCar1,
                    ChargingCar2,
                    PushgingCar1,
                    PushgingCar2
                 
                }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult OvenTime1()
        {
            try
            {
                SqlConnection con1 = new SqlConnection(ConnectionString);
                con1.Open();
                List<string> rows1 = new List<string>();

                int[] Oven1Array1 = new int[] { 701, 711, 721, 731, 741, 751, 761, 771 };
                for (int O1 = 0; O1 < Oven1Array1.Length; O1++)
                {
                    SqlCommand cmd1 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array1[O1] + " order by ID desc ", con1);
                    DataTable dt1 = new DataTable();
                    SqlDataAdapter Dta1 = new SqlDataAdapter(cmd1);
                    Dta1.Fill(dt1);

                    if (dt1.Rows.Count > 0)
                    {
                        for (int i1 = 0; i1 < dt1.Rows.Count; i1++)
                        {
                            rows1.Add("['" + dt1.Rows[i1]["OVEN"] + "','" + dt1.Rows[i1]["CokingTime"] + "']");
                        }
                    }
                }

                con1.Close();

                return Json(new { html1 = rows1 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime2()
        {
            try
            {
                SqlConnection con2 = new SqlConnection(ConnectionString);
                con2.Open();
                List<string> rows2 = new List<string>();

                int[] Oven1Array2 = new int[] { 702, 712, 722, 732, 742, 752, 762, 772 };
                for (int O2 = 0; O2 < Oven1Array2.Length; O2++)
                {
                    SqlCommand cmd2 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array2[O2] + " order by ID desc ", con2);
                    DataTable dt2 = new DataTable();
                    SqlDataAdapter Dta2 = new SqlDataAdapter(cmd2);
                    Dta2.Fill(dt2);

                    if (dt2.Rows.Count > 0)
                    {
                        for (int i2 = 0; i2 < dt2.Rows.Count; i2++)
                        {
                            rows2.Add("['" + dt2.Rows[i2]["OVEN"] + "','" + dt2.Rows[i2]["CokingTime"] + "']");
                        }
                    }
                }

                con2.Close();

                return Json(new { html2 = rows2 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime3()
        {
            try
            {
                SqlConnection con3 = new SqlConnection(ConnectionString);
                con3.Open();
                List<string> rows3 = new List<string>();

                int[] Oven1Array3 = new int[] { 703, 713, 723, 733, 743, 753, 763, 773 };
                for (int O3 = 0; O3 < Oven1Array3.Length; O3++)
                {
                    SqlCommand cmd3 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array3[O3] + " order by ID desc ", con3);
                    DataTable dt3 = new DataTable();
                    SqlDataAdapter Dta3 = new SqlDataAdapter(cmd3);
                    Dta3.Fill(dt3);

                    if (dt3.Rows.Count > 0)
                    {
                        for (int i2 = 0; i2 < dt3.Rows.Count; i2++)
                        {
                            rows3.Add("['" + dt3.Rows[i2]["OVEN"] + "','" + dt3.Rows[i2]["CokingTime"] + "']");
                        }
                    }
                }

                con3.Close();

                return Json(new { html3 = rows3 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime4()
        {
            try
            {
                SqlConnection con4 = new SqlConnection(ConnectionString);
                con4.Open();
                List<string> rows4 = new List<string>();

                int[] Oven1Array4 = new int[] { 704, 714, 724, 734, 744, 754, 764, 774 };
                for (int O4 = 0; O4 < Oven1Array4.Length; O4++)
                {
                    SqlCommand cmd4 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array4[O4] + " order by ID desc ", con4);
                    DataTable dt4 = new DataTable();
                    SqlDataAdapter Dta4 = new SqlDataAdapter(cmd4);
                    Dta4.Fill(dt4);

                    if (dt4.Rows.Count > 0)
                    {
                        for (int i4 = 0; i4 < dt4.Rows.Count; i4++)
                        {
                            rows4.Add("['" + dt4.Rows[i4]["OVEN"] + "','" + dt4.Rows[i4]["CokingTime"] + "']");
                        }
                    }
                }

                con4.Close();

                return Json(new { html4 = rows4 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime5()
        {
            try
            {
                SqlConnection con5 = new SqlConnection(ConnectionString);
                con5.Open();
                List<string> rows5 = new List<string>();

                int[] Oven1Array5 = new int[] { 705, 715, 725, 735, 745, 755, 765, 775 };
                for (int O5 = 0; O5 < Oven1Array5.Length; O5++)
                {
                    SqlCommand cmd5 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array5[O5] + " order by ID desc ", con5);
                    DataTable dt5 = new DataTable();
                    SqlDataAdapter Dta5 = new SqlDataAdapter(cmd5);
                    Dta5.Fill(dt5);

                    if (dt5.Rows.Count > 0)
                    {
                        for (int i5 = 0; i5 < dt5.Rows.Count; i5++)
                        {
                            rows5.Add("['" + dt5.Rows[i5]["OVEN"] + "','" + dt5.Rows[i5]["CokingTime"] + "']");
                        }
                    }
                }

                con5.Close();

                return Json(new { html5 = rows5 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime6()
        {
            try
            {
                SqlConnection con6 = new SqlConnection(ConnectionString);
                con6.Open();
                List<string> rows6 = new List<string>();

                int[] Oven1Array6 = new int[] { 706, 716, 726, 736, 746, 756, 766, 776 };
                for (int O6 = 0; O6 < Oven1Array6.Length; O6++)
                {
                    SqlCommand cmd6 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array6[O6] + " order by ID desc ", con6);
                    DataTable dt6 = new DataTable();
                    SqlDataAdapter Dta6 = new SqlDataAdapter(cmd6);
                    Dta6.Fill(dt6);

                    if (dt6.Rows.Count > 0)
                    {
                        for (int i6 = 0; i6 < dt6.Rows.Count; i6++)
                        {
                            rows6.Add("['" + dt6.Rows[i6]["OVEN"] + "','" + dt6.Rows[i6]["CokingTime"] + "']");
                        }
                    }
                }

                con6.Close();

                return Json(new { html6 = rows6 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime7()
        {
            try
            {
                SqlConnection con7 = new SqlConnection(ConnectionString);
                con7.Open();
                List<string> rows7 = new List<string>();

                int[] Oven1Array7 = new int[] { 707, 717, 727, 737, 747, 757, 767, 777 };
                for (int O7 = 0; O7 < Oven1Array7.Length; O7++)
                {
                    SqlCommand cmd7 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array7[O7] + " order by ID desc ", con7);
                    DataTable dt7 = new DataTable();
                    SqlDataAdapter Dta7 = new SqlDataAdapter(cmd7);
                    Dta7.Fill(dt7);

                    if (dt7.Rows.Count > 0)
                    {
                        for (int i7 = 0; i7 < dt7.Rows.Count; i7++)
                        {
                            rows7.Add("['" + dt7.Rows[i7]["OVEN"] + "','" + dt7.Rows[i7]["CokingTime"] + "']");
                        }
                    }
                }

                con7.Close();

                return Json(new { html7 = rows7 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult OvenTime8()
        {
            try
            {
                SqlConnection con8 = new SqlConnection(ConnectionString);
                con8.Open();
                List<string> rows8 = new List<string>();

                int[] Oven1Array8 = new int[] { 708, 718, 728, 738, 748, 758, 768, 778 };
                for (int O8 = 0; O8 < Oven1Array8.Length; O8++)
                {
                    SqlCommand cmd8 = new SqlCommand("select TOP (1) OVEN, CAST(CokingTime / 60.00 AS DECIMAL(10,2)) AS CokingTime from [SmartCoking_CO_JSW].[dbo].[Dynamic_Push_Table] where OVEN =" + Oven1Array8[O8] + " order by ID desc ", con8);
                    DataTable dt8 = new DataTable();
                    SqlDataAdapter Dta8 = new SqlDataAdapter(cmd8);
                    Dta8.Fill(dt8);

                    if (dt8.Rows.Count > 0)
                    {
                        for (int i8 = 0; i8 < dt8.Rows.Count; i8++)
                        {
                            rows8.Add("['" + dt8.Rows[i8]["OVEN"] + "','" + dt8.Rows[i8]["CokingTime"] + "']");
                        }
                    }
                }

                con8.Close();

                return Json(new { html8 = rows8 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult Pushings_Per_Week(string Select_Date, string Fast_AShift, string Fast_BShift, string Fast_CShift, string Secend_AShift, string Secend_BShift, string Secend_CShift, string Three_AShift, string Three_BShift, string Three_CShift, string Four_AShift, string Four_BShift, string Four_CShift, string Five_AShift, string Five_BShift, string Five_CShift, string Six_AShift, string Six_BShift, string Six_CShift, string Seven_AShift, string Seven_BShift, string Seven_CShift)
        {

            try
            {
                DateTime Select_Week = Convert.ToDateTime(DateTime.Now);
                string Eight_Date = Select_Week.AddDays(1).ToString("yyyy-MM-dd");//Use LAst C Shift only
                string SevenDate = Select_Week.ToString("yyyy-MM-dd");
                string SixDate = Select_Week.AddDays(-1).ToString("yyyy-MM-dd");
                string FiveDate = Select_Week.AddDays(-2).ToString("yyyy-MM-dd");
                string FourDate = Select_Week.AddDays(-3).ToString("yyyy-MM-dd");
                string ThreedDate = Select_Week.AddDays(-4).ToString("yyyy-MM-dd");
                string SecendDate = Select_Week.AddDays(-5).ToString("yyyy-MM-dd");
                string FastDate = Select_Week.AddDays(-6).ToString("yyyy-MM-dd");

                string SevenDate_D = Select_Week.ToString("dddd");
                string SixDate_D = Select_Week.AddDays(-1).ToString("dddd");
                string FiveDate_D = Select_Week.AddDays(-2).ToString("dddd");
                string FourDate_D = Select_Week.AddDays(-3).ToString("dddd");
                string ThreedDate_D = Select_Week.AddDays(-4).ToString("dddd");
                string SecendDate_D = Select_Week.AddDays(-5).ToString("dddd");
                string FastDate_D = Select_Week.AddDays(-6).ToString("dddd");


                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd_F_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FastDate + ' ' + "06:00" + "' and '" + FastDate + ' ' + "13:59" + "' ", con);
                cmd_F_A.ExecuteNonQuery();
                SqlDataReader Rs_F_A = cmd_F_A.ExecuteReader();
                if (Rs_F_A.Read())
                {
                    Fast_AShift = Convert.ToString(Rs_F_A["Count"]);
                    Rs_F_A.Close();
                }
                SqlCommand cmd_F_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FastDate + ' ' + "14:00" + "' and '" + FastDate + ' ' + "21:59" + "' ", con);
                cmd_F_B.ExecuteNonQuery();
                SqlDataReader Rs_F_B = cmd_F_B.ExecuteReader();
                if (Rs_F_B.Read())
                {
                    Fast_BShift = Convert.ToString(Rs_F_B["Count"]);
                    Rs_F_B.Close();

                }
                SqlCommand cmd_F_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FastDate + ' ' + "22:00" + "' and '" + SecendDate + ' ' + "05:59" + "' ", con);
                cmd_F_C.ExecuteNonQuery();
                SqlDataReader Rs_F_C = cmd_F_C.ExecuteReader();
                if (Rs_F_C.Read())
                {
                    Fast_CShift = Convert.ToString(Rs_F_C["Count"]);
                    Rs_F_C.Close();

                }

                SqlCommand cmd_S_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SecendDate + ' ' + "06:00" + "' and '" + SecendDate + ' ' + "13:59" + "' ", con);
                cmd_S_A.ExecuteNonQuery();
                SqlDataReader Rs_S_A = cmd_S_A.ExecuteReader();
                if (Rs_S_A.Read())
                {
                    Secend_AShift = Convert.ToString(Rs_S_A["Count"]);
                    Rs_S_A.Close();
                }
                SqlCommand cmd_S_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SecendDate + ' ' + "14:00" + "' and '" + SecendDate + ' ' + "21:59" + "' ", con);
                cmd_S_B.ExecuteNonQuery();
                SqlDataReader Rs_S_B = cmd_S_B.ExecuteReader();
                if (Rs_S_B.Read())
                {
                    Secend_BShift = Convert.ToString(Rs_S_B["Count"]);
                    Rs_S_B.Close();

                }
                SqlCommand cmd_S_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SecendDate + ' ' + "22:00" + "' and '" + ThreedDate + ' ' + "05:59" + "' ", con);
                cmd_S_C.ExecuteNonQuery();
                SqlDataReader Rs_S_C = cmd_S_C.ExecuteReader();
                if (Rs_S_C.Read())
                {
                    Secend_CShift = Convert.ToString(Rs_S_C["Count"]);
                    Rs_S_C.Close();

                }
                SqlCommand cmd_T_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + ThreedDate + ' ' + "06:00" + "' and '" + ThreedDate + ' ' + "13:59" + "' ", con);
                cmd_T_A.ExecuteNonQuery();
                SqlDataReader Rs_T_A = cmd_T_A.ExecuteReader();
                if (Rs_T_A.Read())
                {
                    Three_AShift = Convert.ToString(Rs_T_A["Count"]);
                    Rs_T_A.Close();
                }
                SqlCommand cmd_T_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + ThreedDate + ' ' + "14:00" + "' and '" + ThreedDate + ' ' + "21:59" + "' ", con);
                cmd_T_B.ExecuteNonQuery();
                SqlDataReader Rs_T_B = cmd_T_B.ExecuteReader();
                if (Rs_T_B.Read())
                {
                    Three_BShift = Convert.ToString(Rs_T_B["Count"]);
                    Rs_T_B.Close();

                }
                SqlCommand cmd_T_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + ThreedDate + ' ' + "22:00" + "' and '" + FourDate + ' ' + "05:59" + "' ", con);
                cmd_T_C.ExecuteNonQuery();
                SqlDataReader Rs_T_C = cmd_T_C.ExecuteReader();
                if (Rs_T_C.Read())
                {
                    Three_CShift = Convert.ToString(Rs_T_C["Count"]);
                    Rs_T_C.Close();

                }

                SqlCommand cmd_FO_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FourDate + ' ' + "06:00" + "' and '" + FourDate + ' ' + "13:59" + "' ", con);
                cmd_FO_A.ExecuteNonQuery();
                SqlDataReader Rs_FO_A = cmd_FO_A.ExecuteReader();
                if (Rs_FO_A.Read())
                {
                    Four_AShift = Convert.ToString(Rs_FO_A["Count"]);
                    Rs_FO_A.Close();
                }
                SqlCommand cmd_FO_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FourDate + ' ' + "14:00" + "' and '" + FourDate + ' ' + "21:59" + "' ", con);
                cmd_FO_B.ExecuteNonQuery();
                SqlDataReader Rs_FO_B = cmd_FO_B.ExecuteReader();
                if (Rs_FO_B.Read())
                {
                    Four_BShift = Convert.ToString(Rs_FO_B["Count"]);
                    Rs_FO_B.Close();

                }
                SqlCommand cmd_FO_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FourDate + ' ' + "22:00" + "' and '" + FiveDate + ' ' + "05:59" + "' ", con);
                cmd_FO_C.ExecuteNonQuery();
                SqlDataReader Rs_FO_C = cmd_FO_C.ExecuteReader();
                if (Rs_FO_C.Read())
                {
                    Four_CShift = Convert.ToString(Rs_FO_C["Count"]);
                    Rs_FO_C.Close();

                }
                //five
                SqlCommand cmd_FI_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FiveDate + ' ' + "06:00" + "' and '" + FiveDate + ' ' + "13:59" + "' ", con);
                cmd_FI_A.ExecuteNonQuery();
                SqlDataReader Rs_FI_A = cmd_FI_A.ExecuteReader();
                if (Rs_FI_A.Read())
                {
                    Five_AShift = Convert.ToString(Rs_FI_A["Count"]);
                    Rs_FI_A.Close();
                }
                SqlCommand cmd_FI_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FiveDate + ' ' + "14:00" + "' and '" + FiveDate + ' ' + "21:59" + "' ", con);
                cmd_FI_B.ExecuteNonQuery();
                SqlDataReader Rs_FI_B = cmd_FI_B.ExecuteReader();
                if (Rs_FI_B.Read())
                {
                    Five_BShift = Convert.ToString(Rs_FI_B["Count"]);
                    Rs_FI_B.Close();

                }
                SqlCommand cmd_FI_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + FiveDate + ' ' + "22:00" + "' and '" + SixDate + ' ' + "05:59" + "' ", con);
                cmd_FI_C.ExecuteNonQuery();
                SqlDataReader Rs_FI_C = cmd_FI_C.ExecuteReader();
                if (Rs_FI_C.Read())
                {
                    Five_CShift = Convert.ToString(Rs_FI_C["Count"]);
                    Rs_FI_C.Close();

                }
                SqlCommand cmd_SI_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SixDate + ' ' + "06:00" + "' and '" + SixDate + ' ' + "13:59" + "' ", con);
                cmd_SI_A.ExecuteNonQuery();
                SqlDataReader Rs_SI_A = cmd_SI_A.ExecuteReader();
                if (Rs_SI_A.Read())
                {
                    Six_AShift = Convert.ToString(Rs_SI_A["Count"]);
                    Rs_SI_A.Close();
                }
                SqlCommand cmd_SI_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SixDate + ' ' + "14:00" + "' and '" + SixDate + ' ' + "21:59" + "' ", con);
                cmd_SI_B.ExecuteNonQuery();
                SqlDataReader Rs_SI_B = cmd_SI_B.ExecuteReader();
                if (Rs_SI_B.Read())
                {
                    Six_BShift = Convert.ToString(Rs_SI_B["Count"]);
                    Rs_SI_B.Close();

                }
                SqlCommand cmd_SI_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SixDate + ' ' + "22:00" + "' and '" + SevenDate + ' ' + "05:59" + "' ", con);
                cmd_SI_C.ExecuteNonQuery();
                SqlDataReader Rs_SI_C = cmd_SI_C.ExecuteReader();
                if (Rs_SI_C.Read())
                {
                    Six_CShift = Convert.ToString(Rs_SI_C["Count"]);
                    Rs_SI_C.Close();

                }

                SqlCommand cmd_Sv_A = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SevenDate + ' ' + "06:00" + "' and '" + SevenDate + ' ' + "13:59" + "' ", con);
                cmd_Sv_A.ExecuteNonQuery();
                SqlDataReader Rs_Sv_A = cmd_Sv_A.ExecuteReader();
                if (Rs_Sv_A.Read())
                {
                    Seven_AShift = Convert.ToString(Rs_Sv_A["Count"]);
                    Rs_Sv_A.Close();
                }
                SqlCommand cmd_Sv_B = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SevenDate + ' ' + "14:00" + "' and '" + SevenDate + ' ' + "21:59" + "' ", con);
                cmd_Sv_B.ExecuteNonQuery();
                SqlDataReader Rs_Sv_B = cmd_Sv_B.ExecuteReader();
                if (Rs_Sv_B.Read())
                {
                    Seven_BShift = Convert.ToString(Rs_Sv_B["Count"]);
                    Rs_Sv_B.Close();

                }
                SqlCommand cmd_Sv_C = new SqlCommand("SELECT Count(PUSHEDTIME) AS Count FROM [SmartCoking_CO_JSW].[dbo].[OVENDATA] where PUSHEDTIME between '" + SevenDate + ' ' + "22:00" + "' and '" + Eight_Date + ' ' + "05:59" + "' ", con);
                cmd_Sv_C.ExecuteNonQuery();
                SqlDataReader Rs_Sv_C = cmd_Sv_C.ExecuteReader();
                if (Rs_Sv_C.Read())
                {
                    Seven_CShift = Convert.ToString(Rs_Sv_C["Count"]);
                    Rs_Sv_C.Close();

                }
                con.Close();
                string AShift = "";
                string BShift = "";
                string CShift = "";
                string Days = "";
                AShift = "[" + Fast_AShift + "," + Secend_AShift + "," + Three_AShift + "," + Four_AShift + "," + Five_AShift + "," + Six_AShift + "," + Seven_AShift + "]";
                BShift = "[" + Fast_BShift + "," + Secend_BShift + "," + Three_BShift + "," + Four_BShift + "," + Five_BShift + "," + Six_BShift + "," + Seven_BShift + "]";
                CShift = "[" + Fast_CShift + "," + Secend_CShift + "," + Three_CShift + "," + Four_CShift + "," + Five_CShift + "," + Six_CShift + "," + Seven_CShift + "]";
                Days = "['" + FastDate_D + "','" + SecendDate_D + "','" + ThreedDate_D + "','" + FastDate_D + "','" + FiveDate_D + "','" + SixDate_D + "','" + SevenDate_D + "']";

                return Json(new { AShift, BShift, CShift, Days }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ChargingAndPushing()
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();

                SqlCommand cmd = new SqlCommand(" ", con);
                cmd.ExecuteNonQuery();
                SqlDataReader SqlReder = cmd.ExecuteReader();
                SqlReder.Read();
                double AShift = Convert.ToDouble(SqlReder["Count"]);
                SqlReder.Close();
                con.Close();
               

                return Json(new {}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}