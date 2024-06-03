
//show hide faq answer
document.addEventListener('DOMContentLoaded', () => {
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            faq.classList.toggle('open');
        });
    });
});
