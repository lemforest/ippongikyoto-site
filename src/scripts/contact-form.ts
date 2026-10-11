const form = document.querySelector<HTMLFormElement>('[data-contact-form]')
if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]')!
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
  const started = form.querySelector<HTMLInputElement>('[name="startedAt"]')!
  started.value = String(Date.now())

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!form.checkValidity()) {
      status.textContent = form.dataset.invalid || ''
      form.reportValidity()
      return
    }
    const data = new FormData(form)
    button.disabled = true
    button.textContent = form.dataset.sending || ''
    status.textContent = ''
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`)
      status.textContent = form.dataset.success || ''
      form.reset()
      started.value = String(Date.now())
    } catch {
      status.textContent = form.dataset.error || ''
    } finally {
      button.disabled = false
      button.textContent = form.dataset.send || ''
    }
  })
}

export {}
