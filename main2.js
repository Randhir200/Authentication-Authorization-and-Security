
// function asyncTask() {
// 	return functionA()
// 		.then((valueA) => functionB(valueA))	
// 		.then((valueB) => functionC(valueB))	
// 		.then((valueC) => functionD(valueC))
// 		.catch((err) => logger.error(error))
// }


// const fun = async ()=>{
//     try{
//         const valueA = await asyncTask();
//         const valueB = await valueA();
//         const valueC = await valueB();

//         return valueC;

//     }catch(err){
//         logger.error(error)
//     }
// }


// for( let i=0; i< 5; i++)
//   {
//      setTimeout(function (){
//         console.log(i);
//      }, i);
//   }

  // 0
  // 1
  // 2

  function fun1(name, ...args) {
     console.log("normal function", args);
   }
   
   var fun1 = (name, ...args) => {
      console.log("arrow function", arguments);
   }
   
   fun1('randhir', 2, 3,4);



// var a=;
