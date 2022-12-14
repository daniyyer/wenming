# Cómo activar una extension de fullPage.js

1. Accede https://alvarotrigo.com/fullPage/extensions/activationKey.html. (Que es la URL que se te envía por email tras la compra de la extensión)
1. Inserta la _clave de licencia_ que se te mostró tras la compra de la extensión. También disponible en el email de confirmación de compra.
1. Dependiendo de tu licencia. Es posible que necesites insertar un dominio para obtener la **clave de activación** para tu producto.
1. Una vez tengas la **clave de activación** para tu extensión y dominio (generada en los pasos anteriores) tendrás que añadir la opción correspondiente a tu extensión en la inicilización de fullPage.js. Ésta tendrá la forma de nombreDeExtensión + "Key": key.

Por ejemplo:

```javascript
var myFullpage = new fullpage("#fullpage", {
  fadingEffect: true,
  fadingEffectKey: "LA CLAVE DE ACTIVACIÓN HA DE COLOCARSE AQUÍ",
});
```

Lo mismo ocurriría con el resto de extensiones que estés usando. Estas son todas las posibles opciones para otras claves de extensiones:

- `fadingEffectKey`
- `responsiveSlidesKey`
- `continuousHorizontalKey`
- `interlockedSlidesKey`
- `scrollHorizontallyKey`
- `resetSlidersKey`
- `offsetSectionsKey`
- `dragAndMoveKey`
- `parallaxKey`
- `cardsKey`

Recuerda el uso de extensiones requiere del uso de [`fullpage.extensions.min.js`](https://github.com/alvarotrigo/fullPage.js/blob/master/dist/fullpage.extensions.min.js) en lugar del habitual archivo de fullPage.js (`fullpage.js`) tal y como se explica en [el uso de extensiones](https://github.com/alvarotrigo/fullPage.js/tree/master/lang/spanish#uso-de-extensiones).

### Qué hacer para entornos de desarrollo y webs de testeo?

No se requiere del uso de clave de activación para entornos localhost. Si necesitas usar una extensión en un entorno de desarrollo externo, puedes obtender la clave de activación para dicho dominio y luego [contactar conmigo](http://alvarotrigo.com/#contact) para que te de otra clave cuando lo muevas a producción.

Si tienes una licencia que te permite generar varias claves de activación para varios dominios tal vez quieras usar el mismo código JS para todos ellos. En este caso puedes usar un array con las diferentes claves para cada dominio. Por ejemplo, si estamos usando la extensión `scrollHorizontally` para 3 dominios podemos hacer lo siguiente:

```js
new fullPage("#fullpage", {
  scrollHorizontally: true,
  scrollHorizontallyKey: ["domain1_key", "domain2_key", "domain3_key"],
});
```

De este modo la extensión podrá usarse en los 3 dominios.

### Clave de licencia vs clave de activación

Son claves muy diferentes:

- Obtienes la **clave de licencia** cuando compras cualquier extensión.
- Obtienes la **clave de activación** cuando activas una extensión para un dominio en concreto (a no ser que uses la licencia de dominios ilimitados). Para generar la clave de actiación necesitarás hacer uso de la clave de licencia.

La clave de licencia está compuesta por 4 grupos de 8 caracteres cada uno (`XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX`) y la clave de activación tiene una longitud variable y no está compuesta por grupos separados (`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`). Es importante no confundir ámbas.
