// // src/context/FavoritesContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//     const [favorites, setFavorites] = useState([]);

//     // Load from localStorage on mount
//     useEffect(() => {
//         const saved = localStorage.getItem('favoriteServices');
//         if (saved) {
//             try {
//                 setFavorites(JSON.parse(saved));
//             } catch (e) {
//                 console.error("Failed to parse favorites", e);
//                 localStorage.removeItem('favoriteServices');
//             }
//         }
//     }, []);

//     // Save to localStorage when favorites change
//     useEffect(() => {
//         localStorage.setItem('favoriteServices', JSON.stringify(favorites));
//     }, [favorites]);

//     const toggleFavorite = (service) => {

//         // console.log("service" + service);

//         setFavorites(prev => {
//             const exists = prev.some(fav => fav.path === service.path);
//             return exists
//                 ? prev.filter(fav => fav.path !== service.path)
//                 : [...prev, service];
//         });
//     };

//     return (
//         <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
//             {children}
//         </FavoritesContext.Provider>
//     );
// };

// export const useFavorites = () => {
//     const context = useContext(FavoritesContext);
//     if (!context) {
//         throw new Error('useFavorites must be used within a FavoritesProvider');
//     }
//     return context;
// };




import { createContext, useContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('favoriteServices');
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites", e);
                localStorage.removeItem('favoriteServices');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favoriteServices', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (service) => {
        setFavorites(prev => {
            const exists = prev.some(fav => fav.path === service.path);
            return exists
                ? prev.filter(fav => fav.path !== service.path)
                : [...prev, service];
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
