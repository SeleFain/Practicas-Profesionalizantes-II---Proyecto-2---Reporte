from flask import Flask, render_template
import mysql.connector
from mysql.connector import Error

# Inicializamos el servidor web de Flask
app = Flask(__name__)

# Esta ruta indica qué hacer cuando entramos a la página principal (/)
@app.route('/')
def inicio():
    try:
        # 1. Configurar los datos de acceso
        conexion = mysql.connector.connect(
            host="localhost",        
            user="root",        
            database="inventario_tienda_informatica"
        )

        if conexion.is_connected():
            # dictionary=True hace que los resultados vengan con el nombre de la columna
            cursor = conexion.cursor(dictionary=True) 
            
            # 3. Hacer la consulta
            cursor.execute("SELECT codigo AS id, modelo, descripcion, precio_unitario, stock FROM articulos;")
            
            # 4. Recuperar los resultados
            articulos_db = cursor.fetchall()
            
            # 5. Enviar el HTML al navegador INYECTANDO los datos de MySQL
            return render_template('index.html', productos=articulos_db)

    except Error as e:
        return f"<h1>Error al conectar a MySQL: {e}</h1>"

    finally:
        # Asegurar el cierre de la conexión
        if 'conexion' in locals() and conexion.is_connected():
            cursor.close()
            conexion.close()

# Esto arranca el servidor web en modo de desarrollo
if __name__ == '__main__':
    app.run(debug=True)