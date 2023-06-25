const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const product_list = document.getElementById('product_list');

const getAllProducts = () =>{
   const data = readLSData('product');

   if(!data){
        product_list.innerHTML = `
        <tr>
        <td colspan="7" class="text-center">No product found</td>
        </tr>
        `;
   }
   if(data){
    let list = '';
    data.map((item, index) => {
        list +=`
        <tr>
        <td>${ index + 1 }</td>
        <td><img style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" src="${ item.photo }"></td>
        <td> ${ item.name } </td>
        <td> ${ item.price } BDT</td>
        <td>${ item.quantity }</td>
        <td>${ item.price *  item.quantity } BDT</td>
        <td style="display: inline;"><button type="button" class="btn btn-primary btn-sm "><i class="fas fa-eye"></i></button></td>
        <td style="display: inline;"><button type="button" class="btn btn-warning btn-sm "><i class="fas fa-edit"></i></button></td>
        <td style="display: inline;"><button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button></td>
    </tr>                              

        `;

   });
   product_list.innerHTML = list;
}
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