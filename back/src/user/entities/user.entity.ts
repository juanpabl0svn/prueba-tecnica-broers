import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id_user: number;
    
    @Column('text')
    password: string;

    @Column({
        type: 'text',
        unique: true,
    })
    email: string;

    @Column('text')
    fullName: string;


    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    create_date: Date;

    @Column({ default: true, nullable: true })
    active: boolean;
}