CREATE TABLE IF NOT EXISTS public.site_settings (
    id text PRIMARY KEY,
    value text NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public update access" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Allow public insert access" ON public.site_settings FOR INSERT WITH CHECK (true);

INSERT INTO public.site_settings (id, value) VALUES ('admin_password', 'admin') ON CONFLICT (id) DO NOTHING;
