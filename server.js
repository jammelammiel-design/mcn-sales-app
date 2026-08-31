// Setup ng Firebase
const firebaseConfig = {
    apiKey: "ILAGAY_ANG_API_KEY_MO",
    databaseURL: "https://ANG-PROJECT-MO-default-rtdb.firebaseio.com"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Kapag may bagong itinype ang kahit sinong user, kusa itong magse-save sa Cloud
function saveDataToLocalStorage() {
    updateSaveStatusUI(true);
    db.ref('meterData').set(pagesData, () => updateSaveStatusUI(false));
}

// Nakikinig ang browser sa anumang pagbabago sa Cloud para mag-update ang screen agad
db.ref('meterData').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        pagesData = data;
        renderTabs();
        loadPageIntoInputs();
        recalculateAll();
    }
});
