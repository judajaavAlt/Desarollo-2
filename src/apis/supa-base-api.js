import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gdpgbevgqmhqmbydsoco.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkcGdiZXZncW1ocW1ieWRzb2NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NzExOTcsImV4cCI6MjA0NDI0NzE5N30.vcv8j_0xZRf5urJP_yyVyHlaBOGPDtMVlyv4mAX2qQo"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
