export const discountPrice = (price,discount)=>{
    const percentage = discount / 100;
    return  price - (price * percentage);
     
}