import mysql.connector
from mysql.connector import Error

try:
    # 1. Configurar los datos de acceso
    conexion = mysql.connector.connect(
        host="localhost",         
        user="root",         
        #password="tu_contraseña", No se requiere contraseña porque se trabaja con el motor MySQL de xampp
        database="inventario_tienda_informatica"       # Nombre de la base de datos
    )

    if conexion.is_connected():
        print("¡Conexión exitosa a MySQL!")
        
        # 2. Crear el cursor para operar en la base de datos
        cursor = conexion.cursor()
        
        # 3. Ejemplo: Hacer una consulta (Query)
        cursor.execute("SELECT * FROM articulos;")
        
        # 4. Recuperar y mostrar los resultados
        resultados = cursor.fetchall()
        for fila in resultados:
            print(fila)

except Error as e:
    # Captura errores de credenciales, red o sintaxis SQL
    print(f"Error al conectar a MySQL: {e}")

#finally:
    # 5. Asegurar el cierre de la conexión
    #if 'conexion' in locals() and conexion.is_connected():
        #cursor.close()
        #conexion.close()
        #print("Conexión cerrada limpiamente.")
