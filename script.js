window.addEventListener('load', ()=> {

    const input = document.getElementById("input");
    const info = document.getElementById("info");
    const set = document.getElementById("set");
    const get = document.getElementById("get");
    const del = document.getElementById("del");

    const cloudStorage = window.Telegram.WebApp.CloudStorage;

    const kay = 'kay';

    // Save or Update key:value
    set.addEventListener('click', () =>{
        if (input.value.length > 0) {
            cloudStorage.setItem(kay, input.value, (error, result) => {
                info.innerHTML = !error && result ? '<span class="green">Saved<span>' : error;
            });
        }else {
            info.innerHTML = '<span class="red">The Input is empty<span>';
        }
    });

    // Read key:value
    get.addEventListener('click', () =>{
        cloudStorage.getItem(kay, (error, data) => {
            info.innerHTML = !error && data ? data : error;
        });
    });

    // Delete key:value
    del.addEventListener('click', () =>{
        cloudStorage.removeItem(kay, (error, result) => {
            info.innerHTML = !error && result ? '<span class="orange">Deleted<span>' : error;
        });
    });
});
