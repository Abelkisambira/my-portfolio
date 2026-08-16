(function () {
  const site = window.ergonSite = window.ergonSite || {};
  const initialized = site.initialized = site.initialized || {};

  if (initialized.contactForm) return;
  initialized.contactForm = true;

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitButton = contactForm?.querySelector('button[type="submit"]');
  const storageKey = 'ergon-designs-inquiries';

  if (!contactForm || !formStatus) return;

  const setStatus = (message, isError = false) => {
    formStatus.textContent = message;
    formStatus.style.color = isError ? '#ffd7d7' : 'rgba(255, 255, 255, 0.8)';
  };

  const saveInquiry = (inquiry) => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const records = Array.isArray(stored) ? stored : [];
      records.push(inquiry);
      localStorage.setItem(storageKey, JSON.stringify(records));
    } catch (error) {
      console.warn('Unable to save inquiry locally:', error);
    }
  };

  const submitToSupabase = async (inquiry) => {
    const supabaseUrl = window.ERGON_SUPABASE_URL || '';
    const supabaseAnonKey = window.ERGON_SUPABASE_ANON_KEY || '';
    const supabase = window.supabase;

    if (!supabase || !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_PROJECT_REF')) {
      return false;
    }

    const client = supabase.createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });

    const { error } = await client.from('inquiries').insert([inquiry]);
    
    if (error) {
      throw error;
    }

    try {
      await client.functions.invoke('send-contact-email', {
        body: inquiry
      });
    } catch (functionError) {
      console.warn('Supabase function email dispatch failed:', functionError);
    }

    return true;
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      setStatus('Please complete your name, email, and project details.', true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus('Please enter a valid email address.', true);
      return;
    }

    const inquiry = {
      name,
      email,
      message,
      submitted_at: new Date().toISOString()
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const supabaseSuccess = await submitToSupabase(inquiry);

      if (supabaseSuccess) {
        setStatus('Thanks! Your message has been received.');
      } else {
        saveInquiry(inquiry);

        const subject = encodeURIComponent(`Project Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

        setStatus('Thanks! Your inquiry has been saved and your email app is opening.');
        window.location.href = `mailto:contact@ergondesigns.com?subject=${subject}&body=${body}`;
      }

      contactForm.reset();
    } catch (error) {
      saveInquiry(inquiry);
      setStatus('We could not send your message right now, but your inquiry has been saved locally.', true);
      console.error('Contact form submission failed:', error);
    } finally {
      window.setTimeout(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send message';
        }
      }, 2500);
    }
  });
})();