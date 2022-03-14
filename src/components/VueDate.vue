<template>
  <section id="vue" class="date-component">
    <header class="date-component__header">
      <div class="date-component__question">
        {{ Subject }}は何月何日ですか？
      </div>
      <h1 class="date-component__date">{{ Subject }}は{{ Month }}{{ daysDate }}{{ Day }}です。</h1>
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
    const subjectDay = ref(0);

    const date = computed(() => {
      const today = new Date();
      today.setDate(today.getDate() + subjectDay.value);
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
      '-3': 'さきおととい',
      '-2': 'おととい',
      '-1': 'きのう',
      '0': 'きよう',
      '1': 'あした',
      '2': 'あさって',
      '3': 'しあさって',
      '4': 'ししあさって',
    }

    const Subject = computed(() => {
      return subjects[subjectDay.value];
    });

    const Month = computed(() => {
      return ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'][date.value.getMonth()];
    });

    const Day = computed(() => {
      return `${['日','月','火','水','木','金','土'][date.value.getDay()]}ようび`;
    });

    const daysDate = computed(() => {
       return `${date.value.getDate()}日`
        .replace(/[0-9]{1}/g, shiftCharacter(0xFEE0));
    });

    return {
      date,
      Month,
      daysDate,
      Day,
      Subject,
      nextDayClass,
      prevDayClass,
      prevAndNextKeys,
      nextSubjectDay,
      previousSubjectDay,
    };
  }
}
</script>