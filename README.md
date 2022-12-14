# Registro de presión arterial

La app consiste en llevar el registro de las medidas de presión arterial realizadas con un monitor de presión arterial o también llamado tensimetro
para generar un historial de medidas que puedan ser consultadas por meses y así poder llevar un control de la salud arterial, según la interpretación
de los datos hecha por un médico.

# Uso

## Registrar una medida de presión

Para agregar una medida de presión presione el boton el icono siguiente:

https://github.com/rvjosecarlos/app-presionarterial/blob/master/icons/anadir.png?raw=true

  1) Ingrese la edad del usuario
  2) Ingrese la medida de presión tomada en un formato como el siguiente: "120/80"

La medida quedara registrada en el localStorage del dispositivo por lo que cada que se use la aplicación los datos persistirán

## Ver medidas registradas

Para ver las medidas registradas presione el boton con el icono siguiente:

https://github.com/rvjosecarlos/app-presionarterial/blob/master/icons/expediente.png?raw=true

Por defecto se desplagarán todos los registros realizados y también se mostrará una caja de opciones que contiene los meses de año para realizar un filtrado
de registros por mes.

Cada registro cuenta con un botón "Eliminar" para quitarlo de la lista. Éste botón elimina unicamente el card donde se encuentra.

## Ver las categorías y rangos de valores de presión Sistólica y Diastólica

Para ver las categorías de los rangos de la presión Sistólica y Diastólica presione el boton con el icono siguiene: 

https://github.com/rvjosecarlos/app-presionarterial/blob/master/icons/registros.png?raw=true

Algunos parametros registrados pueden no entrar dentro del rango de categorías por lo que es recomendable consultar a un médico para su interpretación

## Eliminar todos los registros

Para eliminar todos los registros guardados en localstorage presione el boton con el icono siguiente: 

https://github.com/rvjosecarlos/app-presionarterial/blob/master/icons/eliminar.png?raw=true
