DROP POLICY IF EXISTS "Allow all access to presenter_notes" ON public.presenter_notes;
REVOKE ALL ON public.presenter_notes FROM anon, authenticated;
COMMENT ON TABLE public.presenter_notes IS 'DEPRECATED: speaker notes now live in slide metadata; table locked (no client access).';