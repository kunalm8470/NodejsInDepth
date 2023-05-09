const db = require('../db');

class NotesService {

    constructor() {
        this.getById = this.getById.bind(this);
        this.keysetPaginate = this.keysetPaginate.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getById(id) {
        const queryObj = {
            text: `SELECT 
                    id AS "id",
                    title AS "title",
                    description AS "description",
                    completed AS "completed",
                    created_at AS "createdAt",
                    updated_at as "updatedAt",
                    deleted_at as "deletedAt"
                FROM public.notes
                WHERE id = $1;`,
            values: [id]
        };

        const { rows } = await db.query(queryObj);

        return rows[0];
    }

    async keysetPaginate(limit, searchAfterId, searchAfterDate) {
        let queryObj;

        if (searchAfterId && searchAfterDate) {
            queryObj = {
                text: `SELECT 
                id AS "id",
                title AS "title",
                description AS "description",
                completed AS "completed",
                created_at AS "createdAt",
                updated_at as "updatedAt",
                deleted_at as "deletedAt"
            FROM public.notes
            WHERE deleted_at IS NULL
            AND created_at < $1
            OR (
                id < $2 AND created_at < $1
            )
            ORDER BY created_at DESC
            LIMIT $3;`,
            values: [searchAfterDate, searchAfterId, limit]
          };
        } else {
            queryObj = {
                text: `SELECT 
                id AS "id",
                title AS "title",
                description AS "description",
                completed AS "completed",
                created_at AS "createdAt",
                updated_at as "updatedAt",
                deleted_at as "deletedAt"
            FROM public.notes
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC
            LIMIT $1;`,
                values: [limit]
            };
        }

        const { rows } = await db.query(queryObj);

        return rows;
    }

    async add(title, description) {
        const queryObj = {
            text: `INSERT INTO public.notes AS n (title, description) VALUES ($1, $2)
            RETURNING n.id AS "id",
                    n.title AS "title",
                    n.description AS "description",
                    n.completed AS "completed",
                    n.created_at AS "createdAt",
                    n.updated_at as "updatedAt",
                    n.deleted_at as "deletedAt;" 
            `,
            values: [title, description]
        };

        const { rows } = await db.query(queryObj);

        return rows[0];
    }

    async update(id, title, description, completed) {
        const queryObj = {
            text: `UPDATE public.notes AS n 
            SET title = $1, 
            description = $2,
            completed = $3,
            updated_at = current_timestamp AT TIME ZONE 'UTC'
            WHERE id = $4
            RETURNING n.id AS "id",
                    n.title AS "title",
                    n.description AS "description",
                    n.completed AS "completed",
                    n.created_at AS "createdAt",
                    n.updated_at as "updatedAt",
                    n.deleted_at as "deletedAt;" 
            `,
            values: [title, description, completed, id]
        };

        const { rows } = await db.query(queryObj);

        return rows[0];
    }

    async delete(id) {
        const queryObj = {
            text: `UPDATE public.notes AS n 
            SET deleted_at = current_timestamp AT TIME ZONE 'UTC'
            WHERE id = $1;`,
            values: [id]
        };

        await db.query(queryObj);        
    }
}

module.exports = new NotesService();
