const product_form = document.getElementById('product_form');

const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single-product');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');


const getAllProducts = () =>{
   const data = readLSData('product');
    let list = '';
   if(!data || data.length == 0){
    list = `
        <tr>
        <td colspan="7" class="text-center">No product found</td>
        </tr>
        `;
   }
   if(data && data.length >0){
    let final_amount = 0;
    
    data.map((item, index) => {
        final_amount += ( item.price * item.quantity ); 
        list +=`
        <tr>
        <td>${index + 1}</td>
        <td><img style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" src="${item.photo}"></td>
        <td> ${item.name} </td>
        <td> ${item.price} BDT</td>
        <td>${item.quantity}</td>
        <td>${item.price *  item.quantity} BDT</td>
        <td><a class="btn btn-primary btn-sm product-view" product_index="${index}" data-bs-toggle="modal" href= "#shop_single_modal"><i class="fas fa-eye"></i></a>
        <a class="btn btn-warning btn-sm product-edit" data-bs-toggle="modal" product_index="${index}" href="#shop_edit_modal"><i class="fas fa-edit"></i></a>
        <a class="btn btn-danger btn-sm product-delete" product_index="${index}"><i class="fas fa-trash"></i></a></td>
    </tr>                              

        `;

   });

   list += `<tr>
   
   <td colspan="6" class="text-end">Final Amount- ${final_amount} </td>
   <td></td>
   </tr>`
   
}
product_list.innerHTML = list;
}
 getAllProducts();

product_form.onsubmit = (e) =>{
    e.preventDefault();

    let form_data = new FormData(e.target);
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());
    let productData = Object.fromEntries(form_data.entries());



    if( !name || !price || !quantity || !photo ){
        msg.innerHTML = setAlert('All fields are required.');
    }else{

        createLSData('product', productData);
        msg.innerHTML = setAlert('Data stable.', 'success');
        product_form.reset();
        getAllProducts();
    }
}

//show single product
product_list.onclick = (e) =>{
    e.preventDefault();

    if (e.target.classList.contains('product-view')){


            let index = e.target.getAttribute('product_index');
    
    let data = readLSData('product');


    const {name, price, photo} = data[index];

    single_product.innerHTML = `
    
    <img class = "shadow" src = "${photo}">
    <h1>${name}</h1>
    <p>${price}BDT</p>

    `;

} 
 if(e.target.classList.contains('product-edit')){


  
        let index = e.target.getAttribute('product_index');
        
        let data = readLSData('product');
    
    
        const {name, price, photo, quantity} = data[index];
    
        product_update_form.innerHTML = `<div class="my-3">
       <label>Name:</label>
       <input name="name" type="text" value = "${name}" class="form-control">
</div>
<div class="my-3">
   <label>Price:</label>
   <input name="price" type="text" value="${price}" class="form-control">
</div>
<div class="my-3">
<label>Quantity:</label>
<input name="quantity" type="text" value = "${quantity}" class="form-control">
</div>
<div class="my-3">

<input name="index" type="hidden" value = "${index}" class="form-control">
</div>
<div class="my-3">
<label>Photo:</label>
<input name="photo" type="text" value = "${photo}" class="form-control">
</div>
<div class="my-3">

<img src = "${photo}" class="form-control">
</div>
<div class="my-3">

<input type="submit" class="btn btn-primary w-100" value="Update Now">
</div>`;

}
if(e.target.classList.contains('product-delete')){
    
    let conf = confirm('Are you sure? ');

    if(conf){
    let index = e.target.getAttribute('product_index');
    let data = readLSData('product');
    data.splice(index, 1);
    updateLSData('product', data);
    getAllProducts();
}else{
    alert('Your data safe.');
}

}   
}


    product_update_form.onsubmit = (e) => {
        e.preventDefault();
        const form_data = new FormData(e.target);
        const { name, price, quantity, photo, index } = Object.fromEntries(form_data.entries());

        let all_data = readLSData('product');
        all_data[index] = {name, price, quantity, photo};
  
       
  //console.log(all_data);
        
    updateLSData('product', all_data);
    getAllProducts();
    
    }
