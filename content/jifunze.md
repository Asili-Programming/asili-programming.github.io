+++
title = "Jifunze"
description = "Dhana sita za Asili, kila moja na mfano unaoweza kuendesha na ukurasa wa kina wa wiki."
template = "page.html"
+++

Ukurasa huu unakupa dhana sita za msingi. Kila moja ina mfano mfupi unaokamilika: nakili kwenye [uwanja wa kivinjari](/playground/) au kwenye faili lako, kisha uendeshe. Ukitaka maelezo kamili, fuata kiungo cha wiki chini ya kila mfano.

## 1. Programu na `kuu`

Kila programu ina kazi inayoitwa `kuu`. Ndiyo kiingilio: programu huanzia hapo. `leta matumizi` huleta maneno ya kuchapisha kwenye skrini.

```asili
leta matumizi

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  chapisha("Habari, Asili!")
}
```

[Soma zaidi kwenye wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Basics)

## 2. Thamani: `weka`

`weka` hutangaza thamani yenye jina. Unaweza kuweka maandishi (`Neno`) au namba (`Namba`). Tumia `kama` kubadilisha namba kuwa maandishi.

```asili
leta matumizi

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  weka jina = "Amina"
  weka umri = 21
  chapisha("Jina: " + jina)
  chapisha("Umri: " + (umri kama Neno))
}
```

[Soma zaidi kwenye wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Basics)

## 3. Masharti na mizunguko

`ikiwa` na `vinginevyo` huchagua njia ya kufuata. `kwa ... kutoka ... hadi` hurudia kazi kwa kila namba.

```asili
leta matumizi

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  kwa i kutoka 1 hadi 5 {
    ikiwa i % 2 == 0 {
      chapisha((i kama Neno) + " ni sawa")
    } vinginevyo {
      chapisha((i kama Neno) + " si sawa")
    }
  }
}
```

[Soma zaidi kwenye wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Basics)

## 4. Kazi: `kazi` na `rejesha`

`kazi` hufafanua kazi yenye vigezo na aina ya matokeo. `rejesha` hurudisha matokeo.

```asili
leta matumizi

kazi mraba(n: Namba) -> Namba {
  rejesha n * n
}

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  chapisha("5 x 5 = " + (mraba(5) kama Neno))
}
```

[Soma zaidi kwenye wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Tour)

## 5. Umbo na sifa

`umbo` hufafanua umbo lenye sehemu. Unaweza kuunda thamani kwa kuandika jina la umbo na sehemu zake kwenye mabano ya mkunjo `{ }`.

```asili
leta matumizi

umbo Mwanafunzi { jina: Neno, alama: Namba }

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  weka m = Mwanafunzi { jina: "Juma", alama: 82 }
  chapisha(m.jina + ": " + (m.alama kama Neno))
}
```

[Soma zaidi kwenye wiki →](https://github.com/Asili-Programming/Asili/wiki/Data-Structures)

## 6. Makosa bila `null`

`Tokeo<T, E>` ina `Sawa` au `Kosa`. `linganisha` hushughulikia zote mbili, na kosa halifichwi.

```asili
leta matumizi

kazi gawanya(a: Namba, b: Namba) -> Tokeo<Namba, Neno> {
  ikiwa b == 0 {
    rejesha kosa("Haiwezekani kugawanya na sifuri")
  }
  rejesha tokeo(a / b)
}

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  linganisha gawanya(10, 0) {
    Tokeo::Sawa(v) => { chapisha(v kama Neno) }
    Tokeo::Kosa(e) => { chapisha("Kosa: " + e) }
  }
}
```

[Soma zaidi kwenye wiki →](https://github.com/Asili-Programming/Asili/wiki/Error-Handling)

Umemaliza dhana sita. Hatua inayofuata ni [kusakinisha Pata](/sakinisha/).
