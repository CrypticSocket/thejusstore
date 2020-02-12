if(document.readyState=='loading')
{
    document.addEventListener('DOMContentLoaded', ready)
}

else
{
    ready()
}

function ready()
{
    var rembtn = document.getElementsByClassName("btnrem")
    var qtytxt = document.getElementsByClassName("cartip")
    var additm = document.getElementsByClassName("itembtn")
    
    for(var i=0; i<rembtn.length; i++)
    {
        remrow = rembtn[i]
        remrow.addEventListener('click', removeItem)
    }

    for(var i=0; i<qtytxt.length; i++)
    {
        qtytxt[i].addEventListener('change',updateTotal)
    }

    for(var i=0; i<additm.length; i++)
    {
        additm[i].addEventListener('click', additem)
    }

    updateTotal()
}

function removeItem(event)
{
    var remrow = event.target
    remrow.parentElement.remove()
    updateTotal()
}

function updateTotal()
{   
    var pricetxt = document.getElementsByClassName("cartcost")
    var qtytxt = document.getElementsByClassName("cartip")
    var total=0;
    for(var i=0; i<pricetxt.length; i++)
    {
        var price = parseFloat(pricetxt[i].textContent.replace('Rs. ',''))
        var qty = qtytxt[i].value
        total=total+price*qty
    }
    var totalelement = document.getElementsByClassName("totalamt")[0]
    totalelement.textContent=('Rs. '+ total)
}

function additem(event)
{
    var item = event.target
    var toAdd = item.parentElement.parentElement
    var imgsrc = toAdd.getElementsByClassName("itemimg")[0].src
    var itemname = toAdd.getElementsByClassName("itemtitle")[0].textContent
    var itemprice = toAdd.getElementsByClassName("itemprice")[0].textContent
    var strToAdd = `
    <div class="cartrow cartitem">
        <div class="cartdet cartcol">
            <img src="${imgsrc}" class="cartimg">
            <span class="carttitle">${itemname}</span>
        </div>
        <input class="cartqty cartcol cartip" value="1" type="number">
        <span class="cartprice cartcol cartcost">${itemprice}</span>
        <button role="button" class="cartremove cartcol btn btnrem">Remove</button>
    </div>
    `
    var row = document.createElement('div')
    row.innerHTML = strToAdd
    row.getElementsByClassName("cartip")[0].addEventListener('change',updateTotal)
    row.getElementsByClassName("btnrem")[0].addEventListener('click',removeItem)
    var cart = document.getElementsByClassName("cartitems")[0]
    cart.append(row)
    updateTotal()
}