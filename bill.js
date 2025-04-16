// const buttonClick = document.getElementById(buttonclicks);
const buttonClick = document.querySelector("#buttonclicks");


let gstvalue = 5/100;
let finalPrice = 0;
let platformfee = 9;
let gstonpf = platformfee * 18/100;
let amountToRest=0;

let confeevalue = 2/100;
let tdsvalue = 2/100;
let commissionvalue = 20/100;
let gstoncommisionvalue = commissionvalue * 18/100;

let smallDistance = 4;
let smallDistancePriceKM = 2;
let baseFee = 25;
let longDistancePriceKM = 10;

let DFn1Range = 3;
let Dfn1Price = 5;
let DFn2Range = 7;
let Dfn2Price = 10;
let DFn3Range = 15;
let Dfn3Price = 25;
let DFn4Range = 20;
let Dfn4Price = 40;

let HighFee1Range = 3;
let HighFee1Price = 10;
let HighFee2Range = 7;
let HighFee2Price = 25;
let HighFee3Range = 15;
let HighFee3Price = 40;
let HighFee4Range = 20;
let HighFee4Price = 60;



buttonClick.addEventListener("click", function(){
   let Dfee= DeliveryPartnerPrice();
   CalculateCustomerPOV(Dfee);
    CalculateRestaurantPOV(Dfee);
})

function CalculateCustomerPOV(deliveryPrice){

    let itemP = parseFloat(document.getElementById("inputPrice").value) || 0;
    let discountPrice = parseFloat(document.getElementById("inputDiscount").value) || 0;
    let itemPrice = itemP - discountPrice;

    // let deliveryPrice = parseFloat(document.getElementById("inputDelivery").value) || 0;
    
const WhoGiveDelivery = document.querySelector('input[name="WDF"]:checked').value;
let gst5 = (itemPrice * gstvalue);
    document.getElementById("ItemTotal").innerHTML = itemPrice;
    document.getElementById("GST5").innerHTML = gst5.toFixed(2);
    document.getElementById("GSTonPF").innerHTML = gstonpf.toFixed(2);
    document.getElementById("PlatformFee").innerHTML = platformfee.toFixed(2);
    document.getElementById("PromoCode").innerHTML = - discountPrice.toFixed(2);

     finalPrice = gst5 + gstonpf + platformfee + itemPrice;
    if(WhoGiveDelivery === "Customer"){
        document.getElementById("DeliveryFee").innerHTML = deliveryPrice;
        finalPrice += deliveryPrice;
        amountToRest = finalPrice - platformfee - gstonpf - gst5 - deliveryPrice;
    }else{
        document.getElementById("DeliveryFee").innerHTML = 0;
        amountToRest = finalPrice - platformfee - gstonpf - gst5 ;
    }

    // amountToRest = finalPrice - platformfee - gstonpf - discountPrice - gst5 ;

    document.getElementById("finalPrice").innerHTML = finalPrice.toFixed(2);
}

function CalculateRestaurantPOV(deliveryPrice){
    document.getElementById("Rtotal").innerHTML = amountToRest.toFixed(2);

    let tdsfound = (amountToRest * tdsvalue);
    let commissionable = amountToRest - tdsfound;
    let commission = commissionable * commissionvalue;
    let confee = amountToRest * confeevalue;
    let finaldeducation = 0; 
    let gstoncommission = (commission+confee) * 18/100;

    // let deliveryPrice = parseFloat(document.getElementById("inputDelivery").value) || 0;

    document.getElementById("TDS").innerHTML = tdsfound.toFixed(2);
    document.getElementById("Commission").innerHTML = commission.toFixed(2);
    document.getElementById("GstOnCommission").innerHTML = gstoncommission.toFixed(2);
    document.getElementById("ConFee").innerHTML = confee.toFixed(2);

    const WhoGiveDelivery = document.querySelector('input[name="WDF"]:checked').value;
    
    if(WhoGiveDelivery === "Restaurant"){
        finaldeducation = tdsfound + commission + gstoncommission + confee + deliveryPrice;
        document.getElementById("DeliveryRest").innerHTML = deliveryPrice.toFixed(2);
    }else{
        document.getElementById("DeliveryRest").innerHTML = 0;
        finaldeducation = tdsfound + commission + gstoncommission + confee;
    }

    document.getElementById("deduction").innerHTML = finaldeducation.toFixed(2);

    let NetR = amountToRest - finaldeducation;
    document.getElementById("NetR").innerHTML = NetR.toFixed(2);
}

function DeliveryPartnerPrice(){
    let dpToPickup = Math.ceil(parseFloat(document.getElementById("dpToPickup").value) || 0);
    let pickupToDrop = Math.ceil(parseFloat(document.getElementById("pickupToDrop").value) || 0);
    document.getElementById("BaseFee").innerHTML = `${baseFee.toFixed(2)} `;

    let charge = 0;
    if(pickupToDrop <= smallDistance){
        let smallDistanceCharge = smallDistancePriceKM * pickupToDrop;
        charge = smallDistanceCharge + baseFee;
        document.getElementById("Sdfee").innerHTML = `${smallDistanceCharge.toFixed(2)} `;
    }else{
        let smallDistanceCharge = smallDistancePriceKM * smallDistance;
        let longDistanceCharge = longDistancePriceKM * (pickupToDrop - smallDistance);
        document.getElementById("Sdfee").innerHTML = `${smallDistanceCharge.toFixed(2)} `;
        document.getElementById("Ldfee").innerHTML = `${longDistanceCharge.toFixed(2)} `;
        charge = (smallDistanceCharge) + baseFee + (longDistanceCharge);
    }

    document.getElementById("DpGetPuToDrop").innerHTML = `${charge.toFixed(2)} `;

    
    let tag = document.querySelector('input[name="DF"]:checked').value;
    let fee = 0;
    if(tag === "normalDf"){
        if(dpToPickup <= DFn1Range){
            fee = Dfn1Price ;
        }else if(dpToPickup <= DFn2Range){
            fee = Dfn2Price ;
        }   else if(dpToPickup <= DFn3Range){
            fee = Dfn3Price ;
        } else if(dpToPickup <= DFn4Range){
            fee = Dfn4Price ;
        }else{
            alert("20 KM is Maximum limit")
        }
    }else if(tag === "HighDF"){
        if(dpToPickup <= HighFee1Range){
            fee = HighFee1Price ;
        }else if(dpToPickup <= HighFee2Range){
            fee = HighFee2Price ;
        }else if(dpToPickup <= HighFee3Range){
            fee = HighFee3Price ;
        }else if(dpToPickup <= HighFee4Range){
            fee = HighFee4Price ;
        }
        else{
            alert("20 KM is Maximum limit");
        }
    }else {
        alert("Error");
    }
    
    document.getElementById("DpGetDpToPu").innerHTML = `${fee.toFixed(2)} `;
    
    fee += charge;
    
    document.getElementById("DpGotTotal").innerHTML = `${fee.toFixed(2)} `;

    
    return charge;
}