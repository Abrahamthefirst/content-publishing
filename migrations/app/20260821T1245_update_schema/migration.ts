#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a5b4a7628e487cc86645f3922427d27eac9d58e3245eae2958f57ae742269035/contract';
import endContract from '../../snapshots/a5b4a7628e487cc86645f3922427d27eac9d58e3245eae2958f57ae742269035/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d6ed9d539a8e7dcd1e303640905bea637f4c87c1802ead10081a2b1928f4eb27/contract';
import startContract from '../../snapshots/d6ed9d539a8e7dcd1e303640905bea637f4c87c1802ead10081a2b1928f4eb27/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'events', column: 'userId' }),
      this.addColumn({
        schema: 'public',
        table: 'events',
        column: col('resolvedAt', 'character(36)', {
          codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('password', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'events',
        column: col('actorId', 'character(36)', {
          codecRef: { codecId: 'sql/char@1', typeParams: { length: 36 } },
        }),
      }),
      this.dataTransform(endContract, 'backfill-events-actorId', {
        check: () => placeholder('backfill-events-actorId:check'),
        run: () => placeholder('backfill-events-actorId:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'events', column: 'actorId' }),
      this.dataTransform(endContract, 'handle-nulls-articles-status', {
        check: () => placeholder('handle-nulls-articles-status:check'),
        run: () => placeholder('handle-nulls-articles-status:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'articles', column: 'status' }),
      this.dropNotNull({ schema: 'public', table: 'events', column: 'articleId' }),
      this.setDefault({
        schema: 'public',
        table: 'users',
        column: 'type',
        defaultSql: "DEFAULT 'PENDING'",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
