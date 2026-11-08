+++
title = "Learn"
description = "Six core concepts of Asili, each with a runnable example and a link to the wiki."
template = "page.html"
slug = "learn"
+++

This page covers six core concepts. Each one has a short example that runs as written. Paste it into the [browser IDE](/ide/) or into your own file, and run it. For the full details, follow the wiki link under each example.

## 1. The program and `kuu`

Every program has a function called `kuu`. It is the entry point: the program starts there. `leta matumizi` imports the functions that print to the screen.

```asili
leta matumizi

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  chapisha("Habari, Asili!")
}
```

[Read more in the wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Basics)

## 2. Values: `weka`

`weka` declares a named value. You can store text (`Neno`) or a number (`Namba`). Use `kama` to convert a number to text.

```asili
leta matumizi

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  weka jina = "Amina"
  weka umri = 21
  chapisha("Jina: " + jina)
  chapisha("Umri: " + (umri kama Neno))
}
```

[Read more in the wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Basics)

## 3. Conditions and loops

`ikiwa` and `vinginevyo` choose which path to run. `kwa ... kutoka ... hadi` repeats the block once for each number in the range.

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

[Read more in the wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Basics)

## 4. Functions: `kazi` and `rejesha`

`kazi` defines a function with parameters and a result type. `rejesha` returns the result.

```asili
leta matumizi

kazi mraba(n: Namba) -> Namba {
  rejesha n * n
}

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  chapisha("5 x 5 = " + (mraba(5) kama Neno))
}
```

[Read more in the wiki →](https://github.com/Asili-Programming/Asili/wiki/Language-Tour)

## 5. Structs and `umbo`

`umbo` defines a struct with named fields. Create a value by writing the struct name, then its fields in braces `{ }`.

```asili
leta matumizi

umbo Mwanafunzi { jina: Neno, alama: Namba }

kazi kuu(hoja: Orodha<Neno>) -> Tupu {
  weka m = Mwanafunzi { jina: "Juma", alama: 82 }
  chapisha(m.jina + ": " + (m.alama kama Neno))
}
```

[Read more in the wiki →](https://github.com/Asili-Programming/Asili/wiki/Data-Structures)

## 6. Errors without `null`

`Tokeo<T, E>` is either `Sawa` or `Kosa`. `linganisha` handles both cases, so an error is never hidden.

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

[Read more in the wiki →](https://github.com/Asili-Programming/Asili/wiki/Error-Handling)

That covers the six concepts. The next step is to [install Pata](/en/install/).
