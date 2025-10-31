import { createClient } from '@supabase/supabase-js';

// APS Portal Supabase Client
export const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IkR4bm1EaTdrekhOdEN4cm5TV0c2Rko0QnBsejIiLCJwcm9qZWN0X2lkIjoiNzFhNGNmMjQtZGIwMC00Y2NkLWI0MTMtYzFkNzI1MWVkNTQzIiwianRpIjoiNGVhYWJjY2MtZjNmOS00NWY4LThlMjItNTc3NzEyY2ZjYzgyIiwiaWF0IjoxNzYxOTM2NDgwLCJleHAiOjE3NjE5MzkxODB9.2grp-9BunkcBb01Rqms2A0zS34RZLUVVbONwxi2LfGE`
      }
    }
  }
);
