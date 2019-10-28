
## Respuestas en las rutas

|CASO  |Respuesta|Codigo de estado  |
|--|--|--|
| Recurso creado correctamente |Se responde con el recurso creado| 201 |
|Consulta información al api|Se responde lo que se consultó | 200 |
|El usuario elimina un recurso | 1 si se eliminó correctamente, de lo contrario, 0|	200|
|El usuario actualiza un recurso|0 si se editó correctamente, de lo contrario, 0| 200 |
|Error del lado del cliente |Mensaje: "Error"| 400 |
|Intentar usar el API sin una sesión|Mensaje: "Sin autorización"| 401 |
|Tiene una sesión pero no tiene los suficientes permisos|Mensaje: "Restringido" |403 |



