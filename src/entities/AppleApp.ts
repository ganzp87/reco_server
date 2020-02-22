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
class AppleApp extends BaseEntity {
	@PrimaryGeneratedColumn()
	generatedId: number

	@Column({ type: "text", unique: true })
	id: number

	@Column({ type: "text", unique: true })
	appId: string

	@Column({ type: "text" })
	title: string

	@IsUrl()
	@Column({ type: "text" })
	url: string

	@Column({ type: "text" })
	description: string

	@IsUrl()
	@Column({ type: "text" })
	icon: string

	@Column({ type: "text", nullable: true })
	country: string

	@Column({ type: "text", nullable: true })
	language: string

	@Column({ type: "text", nullable: true })
	category: string

	@Column({ type: "text", nullable: true })
	languages: string[]

	@Column({ type: "text", nullable: true })
	developer: string

	@Column({ type: "double precision", default: 0, nullable: true })
	score: number

	@Column({ type: "int", nullable: true })
	reviews: number

	@Column({ type: "int", nullable: true })
	currentVersionReviews: number

	@IsUrl()
	@Column({ type: "text", nullable: true })
	screenshots: string[]

	@Column({ type: "text", nullable: true })
	genres: string[]

	@Column({ type: "text", nullable: true })
	primaryGenre: string

	@CreateDateColumn() createdAt: string
	@UpdateDateColumn() updatedAt: string
}

export default AppleApp
