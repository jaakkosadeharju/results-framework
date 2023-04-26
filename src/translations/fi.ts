export default {
  translation: {
    app: {
      title: "Results Framework",
      save: "Tallenna",
      delete: "Poista",
      cancel: "Peruuta",
    },
    evaluation: {
      title: "Arviointi",
      recordValue: "Kirjaa arvo",
      value: "Arvo",
      indicatorValue: {
        value: "Arvo ({{unit}})",
      },
    },
    frameworkBuilder: {
      title: "Rakenne",
      indicators: "Indikaattorit",
      addIndicator: "Lisää indikaattori",
      newIndicator: "Uusi indikaattori",
      addGoal: "Lisää päämäärä",
      noGoalsInstructions:
        "Täällä näyttää tyhjältä. Lisää päämäärä aloittaaksesi.",
      goal: {
        goal: "Päämäärä",
        abbr: "G",
        add_outcome: "Lisää tulos",
        defaultName: "Uusi päämäärä",
      },
      outcome: {
        outcome: "Tulos",
        abbr: "OC",
        addOutput: "Lisää tuotos",
        defaultName: "Uusi tulos",
      },
      output: {
        output: "Tuotos",
        abbr: "OP",
        addActivity: "Lisää toiminto",
        defaultName: "Uusi tuotos",
      },
      activity: {
        activity: "Toiminto",
        abbr: "A",
        defaultName: "Uusi toiminto",
      },
      indicator: {
        title: "Nimi",
        weight: "Painotus",
        baseline: "Perustaso",
        target: "Tavoite",
        unit: "Yksikkö",
        description: "Kuvaus",
        actions: "",
        dueDate: "Eräpäivä",
        valueInterval: "Mittausväli",
        valueIntervalTypeOptions: {
          month: { plural: "kuukautta", singular: "kuukausi" },
          week: { plural: "viikkoa", singular: "viikko" },
          day: { plural: "päivää", singular: "päivä" },
        },
      },
    },
    inPlaceEditor: {
      placeholder: "[tyhjä]",
    },
    validate: {
      required: "Pakollinen",
      number: "Anna numero",
      mustBeGreaterThan: "Pitää olla suurempi kuin {{min}}",
      mustBeLessThan: "Pitää olla pienempi kuin {{max}}",
      cannotBeNegative: "Ei voi olla negatiivinen",
      cannotBeZero: "Ei voi olla nolla",
      mustBePositive: "Pitää olla positiivinen",
      cannotBeEmpty: "Ei voi olla tyhjä",
      cannotBeEqualTo: "Ei voi olla yhtä suuri kuin {{value}}",
    },
  },
};
