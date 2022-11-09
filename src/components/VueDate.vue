<template>
  <section id="vue" class="date-component">
    <header class="date-component__header">
      <div class="date-component__question" v-html="QuestionString"></div>
      <h1 class="date-component__date" v-html="DateString"></h1>
    </header>
    <div role="button" :class="prevDayClass" @click="previousSubjectDay" @keydown="prevAndNextKeys">Previous Day</div>
    <div role="button" :class="nextDayClass" @click="nextSubjectDay" @keydown="prevAndNextKeys">Next Day</div>
  </section>
</template>

<style scoped>
  .date-component {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0.75rem;
    grid-row-gap: 1rem;
    height: 100%;
    width: 100%;
  }
  .date-component__header rt {
    opacity: 60%;
    font-size: 45%;
  }
  .date-component__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    grid-area: 1 / 1 / 2 / 13;
    writing-mode: vertical-rl;
  }
  @media only screen and (orientation: landscape) {
    .date-component {
      grid-template-rows: repeat(2, min-content);
    }
    .date-component__header {
      writing-mode:initial;
      align-items: center;
    }
    .date-component__date {
      font-size: 3.75rem;
      line-height: 1;
    }
  } 
  .date-component__question {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    writing-mode: inherit;
    letter-spacing: 0.3rem;
  }
  .date-component__date {
    font-size: 4.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    writing-mode: inherit;
  }
  .date-component__button,
  .date-component__button:focus {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 3px solid transparent;
    color: var(--color-accent);
    padding: 1rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  @media only screen and (orientation: landscape) and (min-width: 1024px) {
    .date-component {
      grid-area: 1 / 1 / 2 / 13;
    }
  }

  @media (hover: hover) {
    .date-component__button:hover {
      color: var(--color-foreground);
    }
  }

  .date-component__button--disabled {
    color: var(--color-background);
    opacity: 0.7;
  }

  .date-component__prev {
    grid-area: 2 / 1 / 3 / 7;
    margin-right: 1rem;
    text-align: right;
  }
  .date-component__next {
    grid-area: 2 / 7 / 3 / 13;
    margin-left: 1rem;
    text-align: left;
  }
</style>

<script>
import { computed, reactive, ref } from 'vue';

const shiftCharacter = delta => char => String.fromCharCode(char.charCodeAt(0) + delta);

export default {
  setup() {
    console.log('Nani the fuck?');

    const subjectDay = ref(0);

    const date = computed(() => {
      const today = new Date();
      today.setDate(today.getDate() + subjectDay.value);
      console.log("Today is:", today)
      return today;
    });

    const prevAndNextKeys = (event) => {
      if (event.key === 'ArrowLeft') {
        this.previousSubjectDay();
      } else if (event.key === 'ArrowRight') {
        this.nextSubjectDay();
      }
    };

    const previousSubjectDay = (event) => {
      event.preventDefault();
      if(subjectDay.value > subjects.min) {
        subjectDay.value--;
      }
    }

    const nextSubjectDay = (event) => {
      event.preventDefault();
      if(subjectDay.value < subjects.max) {
        subjectDay.value++;
      }
    }

    const nextDayClass = computed(() => {
      return subjectDay.value < subjects.max ?
        'date-component__button date-component__next' : 
        'date-component__button date-component__button--disabled date-component__next';
    });

    const prevDayClass = computed(() => {
      return subjectDay.value > subjects.min ?
        'date-component__button date-component__prev' :
        'date-component__button date-component__button--disabled date-component__prev';
    });

    const subjects = {
      'min': -3,
      'max': 4,
      '-3': '<ruby>一昨昨日<rt>さきおととい</rt></ruby>',
      '-2': '<ruby>一昨日<rt>おととい</rt></ruby>',
      '-1': '<ruby>昨日<rt>きのう</rt></ruby>',
      '0': '<ruby>今日<rt>きょう</rt></ruby>',
      '1': '<ruby>明日<rt>あした</rt></ruby>',
      '2': '<ruby>明後日<rt>あさって</rt></ruby>',
      '3': '<ruby>明明後日<rt>しあさって</rt></ruby>',
      '4': '<ruby>し明明後日<rt>ししあさって</rt></ruby>',
    }

    const DateString = computed(() => {
      return `${ Subject() }は${ Month() }<span>${ daysDate() }</span>${ Day() }です。`;
    });

    const QuestionString = computed(() => {
      return `${ Subject() }は<ruby>何<rt>なん</rt></ruby><ruby>月<rt>がつ</rt></ruby>何<ruby>日<rt>にち</rt></ruby>ですか？`;
    });

    const Subject = () => {
      return subjects[subjectDay.value];
    };

    const Month = () => {
      console.log('Month string:', date.value, date.value.getMonth(), `${date.value.getMonth()}<ruby>月<rt>がつ</rt></ruby>`)
      console.log('Shifted string:', `${date.value.getMonth()}<ruby>月<rt>がつ</rt></ruby>`.replace(/[0-9]{1}/g, shiftCharacter(0xFEE0)))
      return `${date.value.getMonth()}<ruby>月<rt>がつ</rt></ruby>`
        .replace(/[0-9]{1}/g, shiftCharacter(0xFEE0));
    };

    const Day = () => {
      return `${['日','月','火','水','木','金','土'][date.value.getDay()]}<ruby>曜日<rt>ようび</rt></ruby>`;
    };

    const daysDate = () => {
      const dateReplacement = {
        1: {
          'regex': /(１日)/g,
          'replacement': '<ruby>１日<rt>ついたち</rt></ruby>',
        },
        2: {
          'regex': /(２日)/g,
          'replacement': '<ruby>２日<rt>ふつか</rt></ruby>',
        },
        3: {
          'regex': /(３日)/g,
          'replacement': '<ruby>３日<rt>みっか</rt></ruby>',
        },
        4: {
          'regex': /(４日)/g,
          'replacement': '<ruby>４日<rt>よっか</rt></ruby>',
        },
        5: {
          'regex': /(５日)/g,
          'replacement': '<ruby>５日<rt>いつか</rt></ruby>',
        },
        6: {
          'regex': /(６日)/g,
          'replacement': '<ruby>６日<rt>むいか</rt></ruby>',
        },
        7: {
          'regex': /(７日)/g,
          'replacement': '<ruby>７日<rt>なのか</rt></ruby>',
        },
        8: {
          'regex': /(８日)/g,
          'replacement': '<ruby>８日<rt>ようか</rt></ruby>',
        },
        9: {
          'regex': /(９日)/g,
          'replacement': '<ruby>９日<rt>ここのか</rt></ruby>',
        },
        10: {
          'regex': /(１０日)/g,
          'replacement': '<ruby>１０日<rt>とうか</rt></ruby>',
        },
        14: {
          'regex': /(１４日)/g,
          'replacement': '<ruby>１４日<rt>じゅうよっか</rt></ruby>',
        },
        20: {
          'regex': /(２０日)/g,
          'replacement': '<ruby>２０日<rt>はつか</rt></ruby>',
        },
        24: {
          'regex': /(２４日)/g,
          'replacement': '<ruby>２４日<rt>にじゅうよっか</rt></ruby>',
        },
      }
      const dateReplacementDefault = {
        'regex': /(日)/g,
        'replacement': '<ruby>日<rt>にち</rt></ruby>',
      }

      const replacementValues = dateReplacement[date.value.getDate()] || dateReplacementDefault;

       return `${date.value.getDate()}日`
        .replace(/[0-9]{1}/g, shiftCharacter(0xFEE0))
        .replace(replacementValues.regex, replacementValues.replacement);
    };

    return {
      date,
      Month,
      daysDate,
      Day,
      Subject,
      DateString,
      QuestionString,
      nextDayClass,
      prevDayClass,
      prevAndNextKeys,
      nextSubjectDay,
      previousSubjectDay,
    };
  }
}
</script>