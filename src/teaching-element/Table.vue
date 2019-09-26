<template>
  <div class="table">
    <div v-for="row in table" :key="row.id" class="table-row">
      <div v-for="cell in row.cells" :key="cell.id" class="table-cell">
        <div class="cell col-xs-12">
          <div class="cell-content" v-html="cell.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

function mapCell(cell, embeds) {
  const content = get(embeds[cell.id], 'data.content');
  return { id: cell.id, content };
}

function mapRow(row, embeds) {
  const cells = sortBy(row.cells, 'position')
    .map(cell => mapCell(cell, embeds));
  return { id: row.id, cells };
}

export default {
  name: 'te-table',
  props: {
    rows: { type: Object, required: true },
    embeds: { type: Object, required: true }
  },
  computed: {
    table() {
      return sortBy(this.rows, 'position')
        .map(row => mapRow(row, this.embeds));
    }
  }
};
</script>

<style lang="scss">
.table {
  display: table;
  border-collapse: collapse;

  .table-row {
    display: table-row;
  }

  .table-cell {
    display: table-cell;
    width: 312px;
    border: 1px solid black;

    .cell {
      padding: 0;

      .cell-content {
        min-height: 42px;
        padding: 12px 15px;

        * {
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
