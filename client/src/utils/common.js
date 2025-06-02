export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2
    },
    750: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4,
    },
  },

};


export const updateFavourites = (propertyId, favourites) => {
  if(favourites.includes(propertyId)){
    return favourites.filter((resId)=>resId!= propertyId)
  }
  else{
    return [...favourites, propertyId]
  }
}

export const checkFavourites = (propertyId, favourites)=>{
  return favourites?.includes(propertyId) ? '#fa3e5f' : 'white'
}


export const validateString = (value)=>{
  value.length < 3 || value=== null?"Must have atleast 3 character" : null
}