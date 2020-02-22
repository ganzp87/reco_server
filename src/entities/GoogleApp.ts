import { IsUrl } from "class-validator"
import {
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm"

@Entity()
class GoogleApp extends BaseEntity {
	@PrimaryGeneratedColumn()
	generatedId: number

	@Column({ type: "text" })
	appId: string

	@Column({ type: "text" })
	title: string

	@IsUrl()
	@Column({ type: "text" })
	url: string

	@Column({ type: "text" })
	description: string

	@Column({ type: "text" })
	summary: string

	@Column({ type: "text" })
	installs: string

	@IsUrl()
	@Column({ type: "text" })
	icon: string

	@Column({ type: "text", nullable: true })
	country: string

	@Column({ type: "text", nullable: true })
	language: string

	@Column({ type: "text", nullable: true })
	category: string

	@Column({ type: "double precision", default: 0, nullable: true })
	score: number

	@Column({ type: "text", nullable: true })
	scoreText: string

	@Column({ type: "int", nullable: true })
	reviews: number

	@Column({ type: "int", nullable: true })
	ratings: number

	@IsUrl()
	@Column({ type: "text", nullable: true })
	screenshots: string[]

	@Column({ type: "text", nullable: true })
	genre: string

	@Column({ type: "text", nullable: true })
	genreId: string

	@Column({ type: "text", nullable: true })
	comments: string[]

	@Column({ type: "int", nullable: true })
	minInstalls: number

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)"
	})
	createdAt: string
	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)"
	})
	updatedAt: string
	// @Column({
	// 	default: () => "NOW()"
	// })
	// createdAt: Date

	// @Column({
	// 	default: () => "NOW()"
	// })
	// updatedAt: Date
}

export default GoogleApp
