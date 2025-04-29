

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."status" AS ENUM (
    'public',
    'private',
    'nonpublic'
);


ALTER TYPE "public"."status" OWNER TO "postgres";


CREATE TYPE "public"."subjects" AS ENUM (
    'physics',
    'chemistry',
    'biology',
    'hygiene',
    'pharmacology',
    'pharmacy',
    'pathology',
    'legal',
    'ethics',
    'practice'
);


ALTER TYPE "public"."subjects" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_auto_increment"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  IF NEW.id != (select currval('examdata_id_seq')) THEN
    RAISE EXCEPTION 'idカラムの値は指定できません。';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."check_auto_increment"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."examdata" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "exam_year" integer NOT NULL,
    "grade" smallint NOT NULL,
    "subject" "public"."subjects" NOT NULL,
    "problem_statement" "text" DEFAULT ''::"text" NOT NULL,
    "problem_img" "text",
    "choices" "jsonb" NOT NULL,
    "choices_img" "jsonb",
    "correct" "jsonb" NOT NULL,
    "explanation" "text" NOT NULL,
    "status" "public"."status" NOT NULL
);


ALTER TABLE "public"."examdata" OWNER TO "postgres";


COMMENT ON TABLE "public"."examdata" IS '試験データ';



ALTER TABLE ONLY "public"."examdata"
    ADD CONSTRAINT "examdata_pkey" PRIMARY KEY ("id");



CREATE POLICY "Enable read access for all users" ON "public"."examdata" FOR SELECT USING (true);



ALTER TABLE "public"."examdata" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "ログイン済みのユーザーの操作" ON "public"."examdata" TO "authenticated" USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";











































































































































































GRANT ALL ON FUNCTION "public"."check_auto_increment"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_auto_increment"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_auto_increment"() TO "service_role";


















GRANT ALL ON TABLE "public"."examdata" TO "anon";
GRANT ALL ON TABLE "public"."examdata" TO "authenticated";
GRANT ALL ON TABLE "public"."examdata" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
