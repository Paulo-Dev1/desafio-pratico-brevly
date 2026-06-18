CREATE TABLE "genereted_csv" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"remote_key" text NOT NULL,
	"remote_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "genereted_csv_remote_key_unique" UNIQUE("remote_key"),
	CONSTRAINT "genereted_csv_remote_url_unique" UNIQUE("remote_url")
);
--> statement-breakpoint
CREATE TABLE "shortened_urls" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"shortened_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shortened_urls_shortened_url_unique" UNIQUE("shortened_url")
);
