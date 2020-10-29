//Funzione per il check dell'array
function checkArray(num, numArr){
  for(var i = 0; i < numArr.length; i++){
    if(num === numArr[i]){
      return true;
    }
  }
  return false;
}
