export const debugLocalStorage = () => {
    console.log('🔍 Debug localStorage:');

    // Ver todas las claves de localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            try {
                const value = localStorage.getItem(key);
                console.log(`  ${key}:`, value ? JSON.parse(value) : 'null');
            } catch (e) {
                console.log(`  ${key}:`, localStorage.getItem(key));
            }
        }
    }
};

// Agrega esto a tu App.tsx para ejecutarlo
// useEffect(() => {
//   debugLocalStorage();
// }, []);