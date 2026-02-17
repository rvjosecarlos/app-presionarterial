# ❤️ Seguimiento de presión arterial
### Aplicación web para registro simple y accesible de presión arterial

Esta aplicación nació para resolver un problema real: mis padres necesitaban llevar un registro constante de su presión arterial por recomendación médica, pero olvidaban dónde anotaban las mediciones.

En lugar de sugerirles otra app compleja, decidí construir una solución simple, clara y diseñada específicamente para personas mayores.

---

## 🎯 Objetivo del proyecto

- Crear una interfaz extremadamente simple y accesible  
- Garantizar persistencia de datos sin depender de backend  
- Entender profundamente cómo funciona el DOM antes de usar frameworks  
- Resolver un problema real con una solución práctica  

---

## 🛠 Stack Tecnológico

- **JavaScript Vanilla (ES6+)**
- **Manipulación directa del DOM (createElement, appendChild, etc.)**
- **LocalStorage para persistencia**
- **HTML5 + CSS3**
- Sin frameworks
- Sin librerías externas
- Sin build tools
- Cero dependencias

Este proyecto fue desarrollado intencionalmente sin frameworks para reforzar fundamentos: manejo de estado, renderizado manual y control total del flujo de la aplicación.

---

## ✨ Características principales

- 📝 Registro de edad y presión arterial (formato 120/80)  
- 💾 Persistencia automática en LocalStorage  
- 🔄 Renderizado dinámico según estado de la aplicación  
- ⚡ Carga instantánea (sin dependencias externas)  

---

## 🧠 Decisiones Técnicas

- **Gestión de estado manual:**  
  Las mediciones se almacenan en un array en memoria sincronizado con LocalStorage.

- **Renderizado imperativo:**  
  La UI se actualiza mediante creación y reemplazo de nodos del DOM sin templating engines.

- **Validación de formato:**  
  Se asegura que la presión cumpla el patrón sistólica/diastólica antes de guardarse.

Este enfoque demuestra comprensión de cómo funcionan internamente frameworks modernos como React (estado → renderizado → actualización del DOM).

---

## 📸 Captura

![Registro de presión arterial](https://res.cloudinary.com/domj6qqht/image/upload/v1771371216/app-pa_nuh0qh.gif)

---

## 🚀 Demo en vivo

🔗 **[Probar la aplicación](https://app-presionarterial.vercel.app/)**

---

## 📦 Cómo ejecutarla localmente

```bash
git clone https://github.com/rvjosecarlos/app-presionarterial.git
cd tu-carpeta-de-clonacion
open index.html

