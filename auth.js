(function(){
    // Auth popup logic (extracted from inline script) with focus-trap and Escape handling
    const popup = document.getElementById('auth-popup');
    if (!popup) return;

    const btns = document.querySelectorAll('.btn-continue');
    const closeBtn = popup.querySelector('.auth-close');
    const accountsList = popup.querySelector('.accounts-list');
    const accounts = popup.querySelectorAll('.account');
    const loading = popup.querySelector('.auth-loading');
    const done = popup.querySelector('.auth-done');
    const doneClose = popup.querySelector('.done-close');

    let lastFocused = null;

    const focusableSelector = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

    function getVisibleFocusable(container){
        return Array.from(container.querySelectorAll(focusableSelector)).filter(el=> !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    }

    function handleKeydown(e){
        if(e.key === 'Escape'){
            e.preventDefault();
            hidePopup();
            return;
        }
        if(e.key !== 'Tab') return;

        const focusable = getVisibleFocusable(popup);
        if(!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length -1];

        if(e.shiftKey){
            if(document.activeElement === first){
                e.preventDefault();
                last.focus();
            }
        } else {
            if(document.activeElement === last){
                e.preventDefault();
                first.focus();
            }
        }
    }

    function showPopup(){
        lastFocused = document.activeElement;
        popup.setAttribute('aria-hidden','false');
        if(accountsList) accountsList.hidden = false;
        if(loading) loading.hidden = true;
        if(done) done.hidden = true;

        // small timeout to allow CSS transition and then focus the first control in the panel
        setTimeout(()=>{
            const focusable = getVisibleFocusable(popup);
            if(focusable.length) focusable[0].focus();
        }, 60);

        document.addEventListener('keydown', handleKeydown);
    }

    function hidePopup(){
        popup.setAttribute('aria-hidden','true');
        document.removeEventListener('keydown', handleKeydown);
        // restore focus
        if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    // wire openers
    btns.forEach(b => b.addEventListener('click', showPopup));

    // close button
    if(closeBtn) closeBtn.addEventListener('click', hidePopup);

    // account selection -> loading -> done
    accounts.forEach(acc => acc.addEventListener('click', ()=>{
        if(accountsList) accountsList.hidden = true;
        if(loading) loading.hidden = false;
        // simulate network delay
        setTimeout(()=>{
            if(loading) loading.hidden = true;
            if(done) done.hidden = false;
            // focus the first focusable in done panel
            const focusable = getVisibleFocusable(popup);
            if(focusable.length) focusable[0].focus();
        }, 1100 + Math.floor(Math.random()*700));
    }));

    if(doneClose) doneClose.addEventListener('click', hidePopup);

    // backdrop click
    popup.addEventListener('click', function(e){ if(e.target === popup) hidePopup(); });

})();
